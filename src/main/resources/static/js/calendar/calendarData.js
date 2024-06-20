
// 오늘의 메뉴를 로드하는 함수 (DB와 연동되는 부분은 여기서 구현)
function loadTodayMenu(date) {
    // DB에서 오늘의 메뉴를 로드하는 로직을 호출
    console.log("Loading menu for date:", date);
}

// 비어있던 일정에 메모가 추가된 경우, 캘린더 데이터 자체가 추가되어야함
function addCalendarByMemo(memo){
    if(!memo)
        return;

    const selectedDate = init.activeDate.toISOString().split("T")[0].replace(/-/g, ".");

    const newEvent = {
        date: selectedDate,
        memo: memo,
    };

    let eventItems = `
            <li>${newEvent.memo}
                <button type="button" class="memo-delete">
                    <span class="fa fa-xmark">X</span>
                </button>
            </li>`;
    $(".event-list").html(eventItems);
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
            if(status === "success"){
                if(data.status !== "OK"){
                    alert(data.status);
                    return;
                }
                $("#new-memo").val("").hide();
                alert("add성공")
                loadCalendars();
            }
        },
    });


    // $.ajax({
    //     type: "POST",
    //     url: "/calendar/saveMemo",
    //     contentType: "application/json",
    //     data: JSON.stringify(newEvent),
    //     success: function (response) {
    //         // calendarlist.push(newEvent); // 서버에 저장된 메모를 로컬 데이터에도 추가
    //         // findCalendarByDate(selectedDate); // 저장 후 해당 날짜의 메모를 갱신
    //         $("#new-memo").val("").hide();
    //         loadCalendars();
    //         // highlightEventDates();
    //     },
    //     error: function (xhr, status, error) {
    //         console.error("Error saving memo:", error);
    //     },
    //     complete: function () {
    //         $("#new-memo").val("").hide();
    //     }
    // });
}

// 비어있던 일정에 오늘의 메뉴가 추가된 경우, 캘린더 데이터 자체가 추가되어야함
function addCalendarByMenu(menu){}

// 이미 오늘의 메뉴가 있는 일정에 메모 추가된 경우 이거나,
// 이미 메모가 있는 일정에 오늘의 메뉴가 추가된 경우,
// 이미 있는 캘린더 데이터를 수정해야한다.
function updateCalendar(calendar){}

// 오늘의 메뉴만 있던 일정에, 오늘의 메뉴를 삭제한 경우 이거나,
// 메모만 있던 일정에, 메모를 삭제한 경우,
// 이미 있던, 해당 캘린더 데이터가 삭제되어야한다.
function deleteCalendar(calendar){}

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

// 특정 날짜의 메모를 로드하는 함수
function findCalendarByDate(date) {
    $.ajax({
        type: "GET",
        url: `/admin/calendar/memos/${date}`,
        contentType: "application/json",
        success: function (events) {

            let eventItems = events.map(event => `
                    <li>${event.memo}
                        <button type="button" class="memo-delete">
                            <span class="fa fa-xmark">X</span>
                        </button>
                    </li>
                `).join('<div class="memo-gap"></div>');

            $(".event-list").html(eventItems);

            $(".event-list li").hover(
                function () {
                    $(this).find(".memo-delete").css("opacity", "1");
                },
                function () {
                    $(this).find(".memo-delete").css("opacity", "0");
                }
            );

            // 일정이 있는 경우에만 알림창 노출
            if (events.length > 0) {
                $("#notification").hide();
            } else {
                $("#notification").show();
            }
        },
        error: function (xhr, status, error) {
            console.error("Error loading events:", error);
        }
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
