/********************************************
                캘린더
 ********************************************/
// 특정 날짜의 데이터가 존재하는지 확인
async function checkDate(dateId) {
    const response = await $.ajax({
        url: "/calendar/detail/" + dateId,
        type: "GET",
        cache: false
    });

    // 응답 객체에서 id 필드가 존재하는지를 확인하여 데이터의 존재 여부를 판단
    if (response.id) {
        const id = response.id;
        const memo = response.memo;
        const menu_id = response.menu_id;
        const comment = response.comment;

        return {
            exists: true,
            id: id,
            menu_id: menu_id,
            comment: comment,
            memo: memo
        };
    } else {
        return false;
    }
}

// 모든 일정 불러오기
function loadCalendars(){
    $.ajax({
        type: "GET",
        url: `/calendar/list`,
        cache: false,
        success: function (data, status) {
            if (status === "success") {
                if (data.status !== "OK") {
                    alert(data.status);
                    return;
                }
                buildCalendar(data.data);
            }
        },
    });
}

// 특정 날짜 데이터 불러오기
async function loadData(dateId){
    console.log("AJAX 요청 URL:", "/calendar/detail/" + dateId);
    $.ajax({
        url: "/calendar/detail/" + dateId,
        type: "GET",
        cache: false,
        success: function (data, status) {
            console.log("AJAX 요청 성공:", status, data);
            if (status === "success") {
                buildTodayMenu(data);
                buildMemo(data);
            }
        },
        error: function (xhr, status, error) {
            console.error("AJAX 요청 실패:", status, error);
            alert("메뉴를 불러오지 못했습니다. 서버에서 오류가 발생했습니다.");
        }
    });
}

/********************************************
                오늘의 메뉴
 ********************************************/

// 오늘의 메뉴 화면에 표시
function buildTodayMenu(data) {
    // 데이터 및 내용 비우기
    $('.today-menu-container').empty();
    initializePopup();

    // 데이터가 없는 경우 알림 메시지를 표시
    if (!data || !data.menu) {
        $('#notification-menu .notification-menu-text').text('등록한 오늘의 메뉴가 없습니다.');
    } else {
        $('#notification-menu .notification-menu-text').text('');

        // 메뉴 데이터를 추가
        $('.today-menu-container').append(`
            <div class="menu-item">
                <p class="today-menu-name">${data.menu.name}</p>
                <div class="img">
                    <div class="menu-img" style="background-image: url('${data.menu.imgUrl}'); height: 200px;"></div>
                </div>
                <div class="menu-text">
                    <textarea id="today-menu-text" readonly>${data.comment}</textarea>
                </div>
                <div class="menu-buttons">
                    <button class="btn-edit">수정</button>
                    <button class="btn-delete">삭제</button>
                </div>
            </div>
        `);
    }
}

// 오늘의 메뉴 데이터를 가져오는 함수
async function buildEditTodayMenu(dateInt) {

    const checkDateResult = await checkDate(dateInt);
    if (!checkDateResult.exists) {
        console.error("No valid data found for the given date.");
        return null;
    }

    const menu = menuList.find(m => m.id === checkDateResult.menu_id);
    if (menu) {
        $('.select-menu-img').attr("src", menu.imgUrl);
        $('.select-menu-name').text(menu.name);
    }

    return {
        menu_id: checkDateResult.menu_id,
        comment: checkDateResult.comment
    };
}

// 오늘의 메뉴 추가
async function addCalendarByMenu(menuId, comment) {
    const {dateInt, selectedDate} = await checkAndConvertDate();
    const checkDateResult = await checkDate(dateInt);

    const data = {
        "menu_id": menuId,
        "comment": comment,
        "date": selectedDate,
        "memo": checkDateResult.exists ? checkDateResult.memo : null
    };

    const url = checkDateResult.exists ? `/calendar/update/${dateInt}` : "/calendar/addByMenu";

    $.ajax({
        url: url,
        type: "POST",
        data: data,
        cache: false,
        success: function(data, status) {
            if (status === "success" && data.status === "OK") {
                alert("오늘의 메뉴가 추가되었습니다.");
                loadData(dateInt);
                $("#myForm2").hide();
                $(".popup-overlay").remove();
            }
        }
    });
}

// 오늘의 메뉴 수정
async function updateCalendarByMenu(menuId, comment) {
    const {dateInt, selectedDate} = await checkAndConvertDate();
    const checkDateResult = await checkDate(dateInt);

    const data = {
        "menu_id": menuId,
        "comment": comment,
        "date": selectedDate,
        "memo": checkDateResult.exists ? checkDateResult.memo : null
    };

    $.ajax({
        url: `/calendar/update/${dateInt}`,
        type: "POST",
        data: data,
        cache: false,
        success: function(data, status) {
            if (status === "success" && data.status === "OK") {
                alert("오늘의 메뉴가 수정되었습니다.");
                loadData(dateInt);
                $("#myForm2").hide();
                $(".popup-overlay").remove();
            }
        }
    });
}

// 오늘의 메뉴 삭제
async function deleteCalendarByMenu(calendarId, menuId, comment) {
    const {dateInt, selectedDate} = await checkAndConvertDate();
    const checkDateResult = await checkDate(dateInt);

    const data = {
        "id": calendarId,
        "menu_id": menuId,
        "comment": comment,
        "date": selectedDate,
        "memo": checkDateResult.exists ? checkDateResult.memo : null
    };

    let url;
    if (checkDateResult.exists && checkDateResult.memo !== null) {
        url = `/calendar/updateToDeleteMenu/${calendarId}`;
    } else {
        url = `/calendar/deleteById/${calendarId}`;
    }

    $.ajax({
        url: url,
        type: "POST",
        data: data,
        cache: false,
        success: function(data, status) {
            if (status === "success" && data.status === "OK") {
                alert("오늘의 메뉴가 삭제되었습니다.");
                loadData(dateInt);
                $('.today-menu-container').empty();
                $('#select-menu-text').empty();
                $(`.cal-body td[data-fdate="${selectedDate}"]`).removeClass("event");
                $('#notification-menu .notification-menu-text').text('등록한 오늘의 메뉴가 없습니다.');
            }
        }
    });
}


/********************************************
                    메모
 ********************************************/

// 메모 화면에 표시
function buildMemo(data) {
    // 'event-list' 클래스를 비우기
    $(".event-list").empty();
    $("#notification").show();

    // 데이터가 없는 경우, 알림 메시지를 표시
    if (!data || !data.memo) {
        $('#notification .notification-text').text('등록한 메모가 없습니다.');
    } else {
        $('#notification .notification-text').text('');

        $(".event-list").append(`
            <li>${data.memo}</li>
             <button type="button" class="memo-edit">
                <span class="fa fa-xmark"></span>
            </button>
            
            <button type="button" class="memo-delete">
                <span class="fa fa-xmark"></span>
            </button>
        `);
    }
}

// 메모 추가
async function addCalendarByMemo(memo) {
    const {dateInt, selectedDate} = await checkAndConvertDate();
    const checkDateResult = await checkDate(dateInt);

    const data = {
        "menu_id": checkDateResult.exists ? checkDateResult.menu_id : null,
        "comment": checkDateResult.exists ? checkDateResult.comment : null,
        "date": selectedDate,
        "memo": memo
    };

    const url = checkDateResult.exists ? `/calendar/update/${dateInt}` : "/calendar/addByMemo";

    $.ajax({
        url: url,
        type: "POST",
        data: data,
        cache: false,
        success: function(data, status) {
            if (status === "success" && data.status === "OK") {
                alert("메모가 추가되었습니다.");
                loadData(dateInt);
                $(".memo-delete, .memo-edit").show();
            }
        }
    });
}

// 메모 수정
async function updateCalendarByMemo(memo) {
    const { dateInt, selectedDate } = await checkAndConvertDate();
    const checkDateResult = await checkDate(dateInt);

    const data = {
        "menu_id": checkDateResult.exists ? checkDateResult.menu_id : null,
        "comment": checkDateResult.exists ? checkDateResult.comment : null,
        "date": selectedDate,
        "memo": memo
    };


    $.ajax({
        url: `/calendar/update/${dateInt}`,
        type: "POST",
        data: data,
        cache: false,
        success: function(data, status) {
            if (status === "success" && data.status === "OK") {
                $("#new-memo").val("").hide();
                alert("메모가 수정되었습니다.");
                loadData(dateInt);
                $(".memo-delete, .memo-edit").show();
            }
        }
    });
}

// 메모 삭제
async function deleteCalendarByMemo(calendarId, memo) {
    const {dateInt, selectedDate} = await checkAndConvertDate();
    const checkDateResult = await checkDate(dateInt);

    const data = {
        "menu_id": checkDateResult.exists ? checkDateResult.menu_id : null,
        "comment": checkDateResult.exists ? checkDateResult.comment : null,
        "date": selectedDate,
        "memo": memo
    };

    let url;
    if (checkDateResult.exists && checkDateResult.menu_id !== null) {
        url = `/calendar/updateToDeleteMemo/${calendarId}`;
    } else {
        url = `/calendar/deleteById/${calendarId}`;
    }

    $.ajax({
        url: url,
        type: "POST",
        data: data,
        cache: false,
        success: function(data, status) {
            if (status === "success" && data.status === "OK") {
                alert("메모가 삭제되었습니다.");
                loadData(dateInt);
            }
        }
    });
}