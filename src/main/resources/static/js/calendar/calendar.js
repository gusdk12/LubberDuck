

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
        findCalendarByDate(date);
        loadTodayMenu(date); // 오늘의 메뉴 로드
    }
}

// 캘린더 셀에 이벤트 클래스 추가하는 함수
function highlightEventDates(calendarDatas) {
    calendarDatas.forEach(event => {
        const dateParts = event.date.split("-");
        const year = dateParts[0];
        const month = dateParts[1];
        let day = dateParts[2];

        // day가 1~9 사이라면 앞에 "0"을 붙여서 포맷팅
        // if (day >= 1 && day <= 9) {
        //     day = "0" + day;
        // }
        console.log(`Processing date: ${year}.${month}.${day}`);

        $(`.cal-body td[data-fdate="${year}.${month}.${day}"]`).addClass("event");

    });
}

function addEvents() {

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

    // 탭 키 이벤트 처리
    $(".schedule-container").on("keydown", function (e) {
        if (e.key === "Tab") {
            showInput();
            e.preventDefault(); // 기본 탭 이벤트 제거
        }
    });

    $(".date").on("click", function () {
        const selectedDate = $(this).data("date"); // 클릭한 날짜의 데이터 속성 값 가져오기
        findCalendarByDate(selectedDate); // 해당 날짜의 메모 로드
    });
    $("#new-memo").on("keydown", handleMemoKeyDown);

    // 버튼 클릭 시 메모 입력 창 열기
    $("#btn-add-memo").on("click", function () {
        showInput();
    });

    // 닫기 버튼 클릭 시 알림창 숨기기
    $("#notification").on("click", function () {
        $("#notification").hide();
    });

    // 메뉴 팝업 열기
    $("#btn-add-menu").on("click", function () {
        openMenuPopup();
    });

    // 메뉴 클릭 시 팝업2 열기
    $(".menu").on("click", function () {
        const menuId = $(this).data("menu-id");
        const menu = menuList.find(m => m.id === menuId);
        if (menu) {
            openWritePopup(menu);
            console.log(menu);
        } else {
            console.error("Menu not found for id: " + menuId);
        }
    });

    $(".menu-close").on("click", function () {
        closeMenuPopup();
    });

    $(".menu-close2").on("click", function () {
        closeWritePopup();
    });

    popupOverlay.on("click", function () {
        closeMenuPopup();
        closeWritePopup();
    });
}

// 메뉴 팝업 열기
function openMenuPopup(menu) {
    $("body").append(popupOverlay);
    $("#myForm").show();
}
// 작성 팝업 열기
function openWritePopup(menu) {
    $("body").append(popupOverlay);
    $("#myForm").hide();
    $(".selected-menu-img").attr("src", menu.imgUrl);
    $(".selected-menu-img").attr("alt", menu.name);
    $(".select-menu-name").text(menu.name);
    $("#myForm2").show();
}
// 메뉴 팝업 닫기
function closeMenuPopup() {
    $("#myForm").hide();
    popupOverlay.remove();
}
// 작성 팝업 닫기
function closeWritePopup() {
    $("#myForm2").hide();
    popupOverlay.remove();
}

// 메모 입력 시 높이를 자동으로 조절하는 함수
function adjustHeight() {
    const newMemo = $("#new-memo");
    newMemo.css("height", "auto");
    newMemo.css("height", newMemo[0].scrollHeight + "px");
}

// 메모 입력 창을 보여주는 함수
function showInput() {
    const newMemo = $("#new-memo");
    newMemo.val("");
    newMemo.css("height", "90px"); // 기본 높이로 설정
    newMemo.show().focus();
    $("#notification").hide();
}

// 메모 입력 시 키보드 이벤트를 처리하는 함수
function handleMemoKeyDown(e) {
    if (e.key === "Enter") {
        const memoText = $("#new-memo").val();
        addCalendarByMemo(memoText);

    } else if (e.key === "Escape") {
        $("#new-memo").val("").hide();
    }
}
