/********************************************
                캘린더
 ********************************************/
// 특정 날짜의 데이터가 존재하는지 확인
async function checkDate(dateId) {
    try {
        const response = await $.ajax({
            url: "/calendar/detail/" + dateId,
            type: "GET",
            cache: false
        });

        // 응답 객체에서 id 필드가 존재하는지를 확인하여 데이터의 존재 여부를 판단
        if (response.id) {
            const memo = response.memo;
            const menu_id = response.menu_id;
            const comment = response.comment;

            return {
                exists: true,
                menu_id: menu_id,
                comment: comment,
                memo: memo
            };
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error fetching calendar details:", error);
        throw error;
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
                calendarlist = data.data;
                buildCalendar(data.data);
            }
        },
    });
}

// 캘린더 다시 그리기
function buildCalendar(data){

    // 달력에 년도와 월을 로드하는 함수
    function loadYYMM(fullDate) {
        let yy = fullDate.getFullYear();
        let mm = fullDate.getMonth();
        let firstDay = new Date(yy, mm, 1);
        let lastDay = new Date(yy, mm + 1, 0);
        let markToday;

        if (mm === init.today.getMonth() && yy === init.today.getFullYear()) {
            markToday = init.today.getDate();
        }

        $(".cal-month").text(init.monList[mm]);
        $(".cal-year").text(yy + "년");

        let trtd = "";
        let startCount;
        let countDay = 0;
        for (let i = 0; i < 6; i++) {
            trtd += "<tr>";
            for (let j = 0; j < 7; j++) {
                if (i === 0 && !startCount && j === firstDay.getDay()) {
                    startCount = 1;
                }
                if (!startCount) {
                    trtd += "<td>";
                } else {
                    let fullDate =
                        yy + "." + init.addZero(mm + 1) + "." + init.addZero(countDay + 1);
                    let eventClass = ""; // 이벤트 클래스는 DB와 연동하여 결정

                    trtd += `<td class="day${eventClass}`;
                    trtd += markToday && markToday === countDay + 1 ? ' today" ' : '"';
                    trtd += ` data-date="${countDay + 1}" data-fdate="${fullDate}">`;

                    // 메뉴가 있는 경우 표시할 수 있도록 DB와 연동하여 처리
                    const menuExists = false; // 예시로 false로 설정
                    if (menuExists) {
                        trtd += `<span style="border-bottom: 2px solid #000;"></span>`;
                    }

                }
                trtd += startCount ? ++countDay : "";
                if (countDay === lastDay.getDate()) {
                    startCount = 0;
                }
                trtd += "</td>";
            }
            trtd += "</tr>";
        }
        $(".cal-body").html(trtd);

        highlightEventDates(data);

    }

    loadYYMM(init.today);
    $(".btn-cal.next").on("click", () => loadYYMM(init.nextMonth()));
    $(".btn-cal.prev").on("click", () => loadYYMM(init.prevMonth()));
    $(".cal-body").on("click", "td", handleDayClick);
}

// 특정 날짜 데이터 불러오기
function loadData(dateId){
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
    $('#select-menu-text').empty();

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

// TODO: 수정 버튼을 클릭할 때만 오늘의 메뉴 팝업 화면에 표시..
/*
function buildEditTodayMenu(data) {
    // 팝업창 내용을 초기화
    $('.select-menu-img').css('background-image', 'none');
    $('.select-menu-name').text('');
    $('#select-menu-text').val('');

    // TODO 그 날짜에 저장된 오늘의 메뉴 data가 있을 경우에만 데이터를 불러와야함...
    if (data && data.menu) {
        $('.select-menu-img').css('background-image', `url('${data.menu.imgUrl}')`);
        $('.select-menu-name').text(data.menu.name);
        $('#select-menu-text').val(data.comment);
    }
}
 */

// 오늘의 메뉴 추가
async function addCalendarByMenu(menuId, comment) {
    const selectedDate = init.activeDate.toISOString().split("T")[0];
    let dateStr = selectedDate.replace(/-/g, '');
    let dateInt = Number(dateStr);

    try {
        const checkDateResult = await checkDate(dateInt);

        // 메모 데이터가 있는지 없는지 구분하여 추가
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
            },
            error: function(xhr, status, error) {
                console.error("Error adding/updating today's menu:", error);
            }
        });
    } catch (error) {
        console.error("Error checking date existence:", error);
    }
}

// 오늘의 메뉴 수정
async function updateCalendarByMenu(menuId, comment) {
    const selectedDate = init.activeDate.toISOString().split("T")[0];
    let dateStr = selectedDate.replace(/-/g, '');
    let dateInt = Number(dateStr);

    try {
        const checkDateResult = await checkDate(dateInt);

        // 메모 데이터가 있는지 없는지 구분하여 수정
        const data = {
            "menu_id": menuId,
            "comment": comment,
            "date": selectedDate,
            "memo": checkDateResult.exists ? checkDateResult.memo : null
        };

        $.ajax({
            url: `/calendar/update/${calendarId}`,
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
            },
            error: function(xhr, status, error) {
                console.error("Error updating menu:", error);
            }
        });
    } catch (error) {
        console.error("Error checking date existence:", error);
    }
}

// 오늘의 메뉴 삭제
async function deleteCalendarByMenu(menuId, comment) {
    const selectedDate = init.activeDate.toISOString().split("T")[0];
    let dateStr = selectedDate.replace(/-/g, '');
    let dateInt = Number(dateStr);

    try {
        const checkDateResult = await checkDate(dateInt);

        // 메모 데이터가 있는지 없는지 구분하여 수정
        const data = {
            "menu_id": menuId,
            "comment": comment,
            "date": selectedDate,
            "memo": checkDateResult.exists ? checkDateResult.memo : null
        };

        const url = checkDateResult.exists ? `/calendar/update/${calendarId}` : `/calendar/deleteById/${calendarId}`;

        $.ajax({
            url: url,
            type: "POST",
            data: data,
            cache: false,
            success: function(data, status) {
                if (status === "success" && data.status === "OK") {
                    alert("오늘의 메뉴가 삭제되었습니다.");
                    loadData(dateInt);
                }
            },
            error: function(xhr, status, error) {
                console.error(`Error updating/deleting memo:`, error);
            }
        });
    } catch (error) {
        console.error("Error checking date existence:", error);
    }
}


/********************************************
                    메모
 ********************************************/

// 메모 화면에 표시
function buildMemo(data) {
    // 'event-list' 클래스를 비우기
    $(".event-list").empty();

    // 데이터가 없는 경우, 알림 메시지를 표시
    if (!data || !data.memo) {
        $('#notification').text('등록한 메모가 없습니다.');
    } else {
        $('#notification').text('');

        $(".event-list").append(`
            <li>${data.memo}
                <button type="button" class="memo-delete">
                    <span class="fa fa-xmark">X</span>
                </button>
            </li>
        `);

        // 메모 삭제 버튼 hover 효과
        $(".event-list li").hover(
            function () {
                $(this).find(".memo-delete").css("opacity", "1");
            },
            function () {
                $(this).find(".memo-delete").css("opacity", "0");
            }
        );
    }
}

// 메모 추가
async function addCalendarByMemo(memo) {
    const selectedDate = init.activeDate.toISOString().split("T")[0];
    let dateStr = selectedDate.replace(/-/g, '');
    let dateInt = Number(dateStr);

    try {
        const checkDateResult = await checkDate(dateInt);

        // 오늘의 메뉴 데이터가 있는지 없는지 구분하여 추가
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
                }
            },
            error: function(xhr, status, error) {
                console.error("Error adding/updating memo:", error);
            }
        });
    } catch (error) {
        console.error("Error checking date existence:", error);
    }
}

// 메모 수정
async function updateCalendarByMemo(calendarId, memo) {
    const selectedDate = init.activeDate.toISOString().split("T")[0];
    let dateStr = selectedDate.replace(/-/g, '');
    let dateInt = Number(dateStr);

    if (!memo) return;

    try {
        const checkDateResult = await checkDate(dateInt);

        // 오늘의 메뉴 데이터가 있는지 없는지 구분하여 수정
        const data = {
            "menu_id": checkDateResult.exists ? checkDateResult.menu_id : null,
            "comment": checkDateResult.exists ? checkDateResult.comment : null,
            "date": selectedDate,
            "memo": memo
        };

        $.ajax({
            url: `/calendar/update/${calendarId}`,
            type: "POST",
            data: data,
            cache: false,
            success: function(data, status) {
                if (status === "success" && data.status === "OK") {
                    $("#new-memo").val("").hide();
                    alert("메모가 수정되었습니다.");
                    loadData(dateInt);
                }
            },
            error: function(xhr, status, error) {
                console.error("Error updating memo:", error);
            }
        });
    } catch (error) {
        console.error("Error checking date existence:", error);
    }
}

// 메모 삭제
async function deleteCalendarByMemo(calendarId) {
    const selectedDate = init.activeDate.toISOString().split("T")[0];
    let dateStr = selectedDate.replace(/-/g, '');
    let dateInt = Number(dateStr);

    try {
        const checkDateResult = await checkDate(dateInt);

        // 오늘의 메뉴 데이터가 있는지 없는지 구분하여 삭제
        const data = {
            "menu_id": checkDateResult.exists ? checkDateResult.menu_id : null,
            "comment": checkDateResult.exists ? checkDateResult.comment : null,
            "date": selectedDate,
            "memo": null
        };

        const url = checkDateResult.exists ? `/calendar/update/${calendarId}` : `/calendar/deleteById/${calendarId}`;

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
            },
            error: function(xhr, status, error) {
                console.error(`Error updating/deleting memo:`, error);
            }
        });
    } catch (error) {
        console.error("Error checking date existence:", error);
    }
}