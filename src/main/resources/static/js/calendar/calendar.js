// 변수 설정
const init = {
    monList: [
        "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월",
    ],
    today: new Date(),
    monForChange: new Date().getMonth(),
    activeDate: new Date(),
    nextMonth: function () {
        let d = new Date();
        d.setDate(1);
        d.setMonth(++this.monForChange);
        this.activeDate = d;
        return d;
    },
    prevMonth: function () {
        let d = new Date();
        d.setDate(1);
        d.setMonth(--this.monForChange);
        this.activeDate = d;
        return d;
    },
    addZero: (num) => (num < 10 ? "0" + num : num),
    activeDTag: null,
};
const popupOverlay = $('<div class="popup-overlay"></div>');

// --------------------------------------------------------
$(document).ready(function () {

    loadCalendars();
    addEvents();
});

// 날짜 클릭 시 이벤트를 처리하는 함수
function handleDayClick(e) {
    const $target = $(e.target);
    if ($target.hasClass("day")) {
        $("#new-memo").hide();

        if (init.activeDTag) {
            init.activeDTag.removeClass("day-active");
        }
        let day = Number($target.text());
        let date = $target.data("fdate");
        $target.addClass("day-active");
        init.activeDTag = $target;
        init.activeDate.setDate(day);
        // findCalendarByDate(date);

        // 가연
        // String 타입인 date를 int 타입으로 바꾸기
        if (date) {
            let dateStr = date.replace(/\./g, ''); // Replace all dots with an empty string
            let dateInt = Number(dateStr); // Convert the resulting string to a number

            loadTodayMenu(dateInt);
        } else {
            console.error("date 값이 없습니다.");
        }
    }
}

// 캘린더 셀에 이벤트 클래스 추가하는 함수
function highlightEventDates(calendarDatas) {
    calendarDatas.forEach(event => {
        const dateParts = event.date.split("-");
        const year = dateParts[0];
        const month = dateParts[1];
        let day = dateParts[2];
        console.log(`Processing date: ${year}.${month}.${day}`);

        $(`.cal-body td[data-fdate="${year}.${month}.${day}"]`).addClass("event");
    });
}

function addEvents() {

// --------------------------------------------------------
// 일정 관련 Event

    // 일정 부분 스크롤
    $(".schedule-container").scroll(function () {
        var scrollTop = $(this).scrollTop();

        // 스크롤이 맨 위에 도달할 때
        if (scrollTop === 0) {
            $(this).addClass("scroll-top");
            setTimeout(function () {
                $(".schedule-container").removeClass("scroll-top");
            }, 500);
        }
    });

    // 입력 시 높이 조절 및 포커스 아웃 시 숨김 처리
    $("#new-memo").on("input", adjustHeight);

    $("#new-memo").on("blur", function () {
        $(this).val("").hide();
    });

    // 메모 입력창에서 엔터키 누를 때 처리
    $("#new-memo").on("keydown", function (e) {
        if (e.key === "Enter") {
            handleMemoSubmit();
            $(this).val("").hide();
        } else if (e.key === "Escape") {
            $(this).val("").hide();
        }
    });

    // 버튼 클릭 시 메모 입력 창을 열고 이미 메모가 있는 경우 메모 수정하는 창 열기
    $("#btn-add-memo").on("click", function () {

        // 기존 메모가 없는 경우에만 추가 모드로 설정하여 보여줌
        if ($(".event-list li").length === 0) {
            $("#new-memo").val("");
            $("#new-memo").css("height", "90px"); // 기본 높이로 설정
            $("#new-memo").data("mode", "add").show().focus();
            $("#notification").hide();
        } else {
            $(".event-list li").find(".memo-delete").remove();

            const memoText = $(".event-list li").text().trim();

            $("#new-memo").val(memoText).data("mode", "edit").show().focus();
            $(".event-list li").hide();
        }
    });

    // 알림 메시지 지우기
    $("#notification").on("click", function () {
        $("#notification").hide();
    });

    // 메모 삭제
    // 캘린더 데이터에서 메모만 null 로 설정하기
    $(document).on("click", ".memo-delete", function () {
        // 삭제 확인 대화상자 표시
        if (confirm("메모를 삭제하시겠습니까?")) {
            const $li = $(this).closest("li");
            const memoText = $li.text().trim();
            const selectedDate = init.activeDate.toISOString().split("T")[0];

            // 캘린더 리스트에서 해당 날짜의 일정 찾기
            let findSchedule = calendarlist.find(schedule => schedule.date === selectedDate);

            if (findSchedule) {
                // 삭제 API 호출
                deleteCalendar(findSchedule.id, memoText);
            } else {
                console.error("No schedule found for the selected date");
            }
        }
    });

// --------------------------------------------------------
// 캘린더 관련 Event

    // 날짜 클릭
    $(".date").on("click", function () {
        const selectedDate = $(this).data("date"); // 클릭한 날짜의 데이터 속성 값 가져오기
        alert(selectedDate);
        // findCalendarByDate(selectedDate); // 해당 날짜의 메모 로드
    });

// --------------------------------------------------------
// 오늘의 메뉴 관련 Event

    // 메뉴 리스트 팝업 열기
    $("#btn-add-menu").on("click", function () {
        $("body").append(popupOverlay);
        $("#myForm").show();
    });

    // 메뉴 클릭 시 오늘의 메뉴 디테일 팝업 열기
    $(".menu").on("click", function () {
        const menuId = $(this).data("menu-id");
        const menu = menuList.find(m => m.id === menuId);

        if (menu) {
            $("body").append(popupOverlay);
            $("#myForm").hide();
            $("#myForm2").show();
            $(".select-menu-img").attr("src", menu.imgUrl);
            $(".select-menu-img").attr("alt", menu.name);
            $(".select-menu-name").text(menu.name);
        }

        // 오늘의 메뉴 저장 버튼
        $(".btn-save").on("click", function() {
            const comment = $("#select-menu-text").val();
            if (!comment) {
                alert("코멘트를 입력하세요.");
                return;
            }
            addCalendarByMenu(menuId, comment);
        });
    });



    $(".menu-close").on("click", function () {
        $("#myForm").hide();
        popupOverlay.remove();
    });

    $(".menu-close2").on("click", function () {
        $("#myForm2").hide();
        popupOverlay.remove();
    });

    popupOverlay.on("click", function () {
        $("#myForm").hide();
        $("#myForm2").hide();
        popupOverlay.remove();
    });
}

// 메모 입력 시 높이를 자동으로 조절하는 함수
function adjustHeight() {
    $("#new-memo").css("height", "auto");
    $("#new-memo").css("height", newMemo[0].scrollHeight + "px");
}

// 메모 추가 또는 수정 처리 함수
function handleMemoSubmit() {
    const memoText = $("#new-memo").val();

    if ($("#new-memo").data("mode") === "edit") {
        const selectedDate = init.activeDate.toISOString().split("T")[0];
        let findSchedule = calendarlist.find(schedule => schedule.date === selectedDate);
        updateCalendar(findSchedule.id, memoText);
    } else {
        addCalendarByMemo(memoText);
    }
}