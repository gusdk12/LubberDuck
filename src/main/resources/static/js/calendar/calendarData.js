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
async function loadCalendars(){
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
async function buildCalendar(data){

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

// 팝업을 열 때 초기화 함수
function initializePopup() {
    // 팝업 열기 전 초기화
    $(".select-menu-img").empty();
    $(".select-menu-name").empty();
    $("#select-menu-text").empty();
}

// 오늘의 메뉴 데이터를 가져오는 함수
async function buildEditTodayMenu(dateInt) {
    try {
        const checkDateResult = await checkDate(dateInt);

        if (checkDateResult.exists) {
            if (checkDateResult.menu_id && checkDateResult.comment) {
                const menu = menuList.find(m => m.id === checkDateResult.menu_id);
                if (menu) {
                    $('.select-menu-img').css('background-image', `url('${menu.imgUrl}')`);
                    $('.select-menu-name').text(menu.name);
                }
                $('#select-menu-text').val(checkDateResult.comment);
            } else {
                console.error("No valid menu or comment data found.");
            }
        }
    } catch (error) {
        console.error("Error fetching today's menu:", error);
    }
}

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

// TODO: 이건 안됨
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
            },
            error: function(xhr, status, error) {
                console.error("Error updating menu:", error);
            }
        });
    } catch (error) {
        console.error("Error checking date existence:", error);
    }
}

// TODO: 이건 안됨
// 오늘의 메뉴 삭제 (메모가 있을 때 삭제)
async function deleteToUpdateCalendarByMenu() {
    const selectedDate = init.activeDate.toISOString().split("T")[0];
    let dateStr = selectedDate.replace(/-/g, '');
    let dateInt = Number(dateStr);

    try {
        const checkDateResult = await checkDate(dateInt);

        const data = {
            "menu_id": null,
            "comment": null,
            "date": selectedDate,
            "memo": checkDateResult.memo
        };

        const url = `/calendar/update/${dateInt}`;

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
                console.error(`Error updating/deleting menu:`, error);
            }
        });
    } catch (error) {
        console.error("Error checking date existence:", error);
    }
}

// 오늘의 메뉴 삭제 (메모가 없을 때 삭제)
async function deleteCalendarByMenu(calendarId) {
    const selectedDate = init.activeDate.toISOString().split("T")[0];

    try {
        const checkDateResult = await checkDate(calendarId);

        if (checkDateResult.exists) {
            const data = {
                "menu_id": null,
                "comment": null,
                "date": checkDateResult.date,
                "memo": null
            };

            const url = `/calendar/deleteById/${calendarId}`;

            $.ajax({
                url: url,
                type: "POST",
                data: data,
                cache: false,
                success: function(data, status) {
                    if (status === "success" && data.status === "OK") {
                        alert("오늘의 메뉴가 삭제되었습니다.");
                        $('.today-menu-container').empty();
                        $('#select-menu-text').empty();
                        $(`.cal-body td[data-fdate="${selectedDate}"]`).removeClass("event");
                        $('#notification-menu .notification-menu-text').text('등록한 오늘의 메뉴가 없습니다.');
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Error deleting menu:", error);
                }
            });
        } else {
            console.error("No existing record found for the given calendarId.");
        }
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
        $('#notification .notification-text').text('등록한 메모가 없습니다.');
    } else {
        $('#notification .notification-text').text('');

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

// 메모 삭제 (오늘의 메뉴 데이터가 있을 때)
async function deleteToUpdateCalendarByMemo(calendarId) {
    const selectedDate = init.activeDate.toISOString().split("T")[0];
    let dateStr = selectedDate.replace(/-/g, '');
    let dateInt = Number(dateStr);

    try {
        const checkDateResult = await checkDate(dateInt);

        const data = {
            "menu_id": checkDateResult.menu_id,
            "comment": checkDateResult.comment,
            "date": selectedDate,
            "memo": null
        };

        const url = `/calendar/update/${calendarId}`;

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

// TODO: 이건 안됨
// 메모 삭제 (오늘의 메뉴 데이터가 없을 때)
async function deleteCalendarByMemo(calendarId) {
    const selectedDate = init.activeDate.toISOString().split("T")[0];
    let dateStr = selectedDate.replace(/-/g, '');
    let dateInt = Number(dateStr);

    try {
        const checkDateResult = await checkDate(dateInt);

        const data = {
            "menu_id": null,
            "comment": null,
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
                    $(`.cal-body td[data-fdate="${selectedDate}"]`).removeClass("event");
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