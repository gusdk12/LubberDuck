// // 특정 날짜의 데이터가 존재하는지 확인
async function checkDate(dateId) {
    try {
        const response = await $.ajax({
            url: "/calendar/detail/" + dateId,
            type: "GET",
            cache: false
        });

        // 응답 객체에서 id 필드가 존재하는지를 확인하여 데이터의 존재 여부를 판단
        if (response.id) {
            const memo = response.memo; // memo 필드 값 추출
            return {
                exists: true,
                memo: memo // 메모 값을 반환
            };
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error fetching calendar details:", error);
        throw error;
    }
}


//
// // 모든 일정 불러오기
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
//
// // 특정 날짜의 메모, 오늘의 메뉴 불러오기
// function findCalendarByDate(date) {
//     $.ajax({
//         type: "GET",
//         url: `/calendar/detail/${date}`,
//         contentType: "application/json",
//         success: function (data) {
//
//             // 메모 표시
//             if (data && data.memo) {
//                 let memoItem = `
//                     <li>${data.memo}
//                         <button type="button" class="memo-delete">
//                             <span class="fa fa-xmark">X</span>
//                         </button>
//                     </li>`;
//
//                 $(".event-list").html(memoItem);
//
//                 $(".event-list li").hover(
//                     function () {
//                         $(this).find(".memo-delete").css("opacity", "1");
//                     },
//                     function () {
//                         $(this).find(".memo-delete").css("opacity", "0");
//                     }
//                 );
//                 $("#notification").hide();
//             } else {
//                 $(".event-list").html("");  // 메모가 없는 경우 리스트를 비움
//                 $("#notification").show();
//             }
//
//             // 오늘의 메뉴 표시
//             if (data && data.menu_id) {
//                 $(".menu-img").attr("src", data.menu.imgUrl);
//                 $(".menu-img").attr("alt", "Menu Image");
//                 $(".today-menu-name").text(data.menu.name);
//                 $("#today-menu-text").val(data.comment);
//                 $(".today-menu-container").show();
//                 $("#notification-menu").hide();
//             } else {
//                 $(".today-menu-container").hide();
//                 $("#notification-menu").show();
//             }
//         },
//         error: function (xhr, status, error) {
//             console.error("Error loading events:", error);
//         }
//     });
// }

// // 특정 날짜에 아무 데이터도 없을 때 메모 추가
function addCalendarByMemo(memo){
    if(!memo)
        return;

    const selectedDate = init.activeDate.toISOString().split("T")[0].replace(/-/g, ".");

    const newEvent = {
        date: selectedDate,
        memo: memo,
    };

    let eventItem = `
        <li>${newEvent.memo}
            <button type="button" class="memo-delete">
                <span class="fa fa-xmark">X</span>
            </button>
        </li>`;
    $(".event-list").html(eventItem);
    $("#notification").hide();

    const data = {
        "memo": memo,
        "date": selectedDate,
    };

    $.ajax({
        url: "/calendar/addByMemo",
        type: "POST",
        data: data,
        cache: false,
        success: function(data, status){
            if (status === "success" && data.status === "OK") {
                $("#new-memo").val("").hide();
                alert("메모가 추가되었습니다.");
                loadCalendars();
            }
        },
    });
}
//
// // 만약, 데이터가 있다면, update
// // 없다면, insert
//
// 특정 날짜에 아무 데이터도 없을 때 오늘의 메뉴 추가
async function addCalendarByMenu(menuId, comment) {
    const selectedDate = init.activeDate.toISOString().split("T")[0];
    let dateStr = selectedDate.replace(/-/g, '');
    let dateInt = Number(dateStr);

    try {
        // Check if data exists for the selected date
        const checkDateResult = await checkDate(dateInt);


        if (!checkDateResult.exists) {
            const data = {
                "menu_id": menuId,
                "comment": comment,
                "date": selectedDate,
                "memo": null // 일단 null
            };

            // Add new calendar entry
            $.ajax({
                url: "/calendar/addByMenu",
                type: "POST",
                data: data,
                cache: false,
                success: function(data, status) {
                    if (status === "success" && data.status === "OK") {
                        alert("오늘의 메뉴가 추가되었습니다.");
                        loadTodayMenu(dateInt);
                        $("#myForm2").hide();
                        $(".popup-overlay").remove();
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Error adding today's menu:", error);
                }
            });
        // 존재한다면 update
        } else {
            const memo = checkDateResult.memo;
            const data = {
                "menu_id": menuId,
                "comment": comment,
                "date": selectedDate,
                "memo": memo // 기존 memo 값을 유지
            };

            $.ajax({
                url: "/calendar/update/" + dateInt,
                type: "POST",
                data: data,
                cache: false,
                success: function(data, status) {
                    if (status === "success" && data.status === "OK") {
                        alert("오늘의 메뉴가 추가되었습니다.");
                        loadTodayMenu(dateInt);
                        $("#myForm2").hide();
                        $(".popup-overlay").remove();
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Error adding today's menu:", error);
                }
            });
        }
    } catch (error) {
        console.error("Error checking date existence:", error);
    }
}
//
//
// // 특정 날짜에 아무 데이터도 없을 때 오늘의 메뉴 추가
// function addCalendarByMenu(menuId, comment, selectedDate) {
//     // 서버에서 해당 날짜의 데이터를 확인
//     $.ajax({
//         type: "GET",
//         url: `/calendar/detail/${selectedDate}`,
//         contentType: "application/json",
//         success: function (data) {
//             // 데이터가 없으면 추가
//             if (!data || (!data.memo && !data.menu_id)) {
//                 const dataToAdd = {
//                     "menu_id": menuId,
//                     "comment": comment,
//                     "date": selectedDate
//                 };
//
//                 $.ajax({
//                     url: "/calendar/addByMenu",
//                     type: "POST",
//                     data: dataToAdd,
//                     cache: false,
//                     success: function(data, status) {
//                         if (status === "success" && data.status === "OK") {
//                             alert("오늘의 메뉴가 추가되었습니다.");
//                             loadCalendars(); // 캘린더 다시 로드
//                             $("#myForm2").hide(); // 팝업 닫기
//                         }
//                     },
//                     error: function(xhr, status, error) {
//                         console.error("Error adding today's menu:", error);
//                     }
//                 });
//             } else {
//                 alert("이미 데이터가 존재합니다.");
//             }
//         },
//         error: function (xhr, status, error) {
//             console.error("Error checking calendar detail:", error);
//         }
//     });
// }
//
//  */
//
//
// // 이미 오늘의 메뉴가 있는 일정에 메모 추가된 경우 이거나,
// // 이미 메모가 있는 일정에 오늘의 메뉴가 추가된 경우,
// // 또한, 오늘의 메뉴와 메모가 모두 있는 일정에서 둘 중 하나를 삭제한 경우,
// // 이미 있는 캘린더 데이터를 수정해야한다.
function updateCalendar(calendarId, memo) {

    if (!memo) return;
    const data = { "memo": memo, "id": calendarId };

    // TODO: 지금은 메모만 수정됨 오늘의 메뉴 수정
    $.ajax({
        url: `/calendar/update`,
        type: "POST",
        data: data,
        cache: false,
        success: function (data, status) {
            if (status === "success" && data.status === "OK") {
                $("#new-memo").val("").hide();
                alert("메모가 수정되었습니다.");

                const selectedDate = init.activeDate.toISOString().split("T")[0].replace(/-/g, ".");
                // findCalendarByDate(selectedDate);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error updating memo:", error);
        }
    });
}
//
function deleteCalendar(calendarId, memo) {
    const data = {
        "id": calendarId,
        "memo": memo
    };
    // TODO: 특정 날짜에 메모만 있거나, 오늘의 메뉴만 있을 경우 해당 id 삭제

    // 특정 날짜의 데이터는 남겨두고 메모만 NULL 로 수정
    $.ajax({
        url: "/calendar/updateToDeleteMemo",
        type: "POST",
        data: data,
        cache: false,
        success: function (data, status) {
            if (status === "success" && data.status === "OK") {
                alert("메모가 삭제되었습니다.");
                const selectedDate = init.activeDate.toISOString().split("T")[0].replace(/-/g, ".");
                // findCalendarByDate(selectedDate);
                $(`.cal-body td[data-fdate="${selectedDate}"]`).removeClass("event");
            }
        },
        error: function(xhr, status, error) {
            console.error("Error deleting memo:", error);
        }
    });
}
//
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

// 가연
// 특정 날짜의 오늘의 메뉴 불러오기
function loadTodayMenu(dateId){
    console.log("AJAX 요청 URL:", "/calendar/detail/" + dateId);
    $.ajax({
        url: "/calendar/detail/" + dateId,
        type: "GET",
        cache: false,
        success: function (data, status) {
            console.log("AJAX 요청 성공:", status, data);
            if (status === "success") {
                buildTodayMenu(data);
            }
        },
        error: function (xhr, status, error) {
            console.error("AJAX 요청 실패:", status, error);
            alert("메뉴를 불러오지 못했습니다. 서버에서 오류가 발생했습니다.");
        }
    });
}
function buildTodayMenu(data) {
    // 'today-menu-container' 클래스를 비웁니다
    $('.today-menu-container').empty();

    // 응답 데이터의 구조가 올바른지 확인합니다
    console.log("서버 응답 데이터:", data);

    // 데이터가 없는 경우, 알림 메시지를 표시합니다
    if (!data || !data.menu) {
        $('#notification-menu .notification-menu-text').text('등록한 오늘의 메뉴가 없습니다.');
    } else {
        $('#notification-menu .notification-menu-text').text('');

        // 메뉴 데이터를 추가합니다
        $('.today-menu-container').append(`
            <div class="menu-item">
               
                <p class="today-menu-name">${data.menu.name}</p>
                <div class="menu-img" style="background-image: url('${data.menu.imgUrl}'); height: 200px;"></div>
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