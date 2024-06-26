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
    const target = $(e.target);
    if (target.hasClass("day")) {
        $("#new-memo").hide();

        if (init.activeDTag) {
            init.activeDTag.removeClass("day-active");
        }
        let day = Number(target.text());
        let date = target.data("fdate");
        target.addClass("day-active");
        init.activeDTag = target;
        init.activeDate.setDate(day);

        // String 타입인 date 를 int 타입으로 바꾸기
        if (date) {
            let dateStr = date.replace(/\./g, '');
            let dateInt = Number(dateStr);
            loadData(dateInt);
        } else {
            console.error("date 값이 없습니다.");
        }
    }
}

// 캘린더 셀에 이벤트 클래스 추가하는 함수
function highlightEventDates(calendarData) {
    calendarData.forEach(event => {
        const dateParts = event.date.split("-");
        const year = dateParts[0];
        const month = dateParts[1];
        let day = dateParts[2];
        $(`.cal-body td[data-fdate="${year}.${month}.${day}"]`).addClass("event");
    });
}

// 공통 기능: 날짜 변환 및 체크
async function checkAndConvertDate() {
    const selectedDate = init.activeDate.toISOString().split("T")[0]; // 사용자에 의해 선택된 날짜
    let dateStr = selectedDate.replace(/-/g, '');
    let dateInt = Number(dateStr);
    return {dateStr, dateInt, selectedDate}; // 객체로 반환
}

// 공통 기능: 팝업 초기화 및 오버레이 추가
function initializeAndShowPopup(popupId) {
    initializePopup();
    $("body").append(popupOverlay);
    $(popupId).show();
}

// 팝업을 열 때 초기화 함수
function initializePopup() {
    // 팝업 열기 전 초기화
    $(".menu-img").css('background-image', 'none'); // 팝업에서 선택해서 달력으로 넘어간 이미지 초기화
    $(".today-menu-name").text(''); // 팝업에서 선택해서 달력으로 넘어간 메뉴 이름 초기화
    $("#today-menu-text").val(''); // 팝업에서 선택해서 달력으로 넘어간 코멘트 초기화

    $(".select-menu-name").text('');  // 팝업에서 선택된 메뉴 이름 초기화
    $("#select-menu-text").val(''); // 팝업에서 선택된 메뉴 코멘트 초기화
    $('.select-menu-img').css('background-image', 'none'); // 팝업에서 선택된 이미지 초기화
}

function addEvents() {

    /****************************************************************
                        오늘의 메뉴 관련 이벤트
     ****************************************************************/
    let selectedMenuId = null; // 사용자가 선택한 메뉴 정보

    // 메뉴 리스트 팝업 열기
    $("#btn-add-menu").on("click", async function () {
        const {dateInt} = await checkAndConvertDate();

        const checkDateResult = await checkDate(dateInt);
        if (checkDateResult.exists && checkDateResult.menu_id) {
            alert("이미 메뉴가 존재합니다.");
            return;
        }
        initializeAndShowPopup("#myForm");
        window.isEdit = false;
    });

    // 메뉴 클릭 시 선택한 메뉴 정보 가져와서 오늘의 메뉴 디테일 팝업 열기
    $(".menu").on("click", function () {
        selectedMenuId = $(this).data("menu-id"); // 선택한 메뉴 정보 가져오기
        let menu = menuList.find(m => m.id === selectedMenuId);

        if (menu) {
            initializeAndShowPopup("#myForm2");
            $("#myForm").hide();
            $(".select-menu-img").attr("src", menu.imgUrl).attr("alt", menu.name);
            $(".select-menu-name").text(menu.name);
        }
    });

    // 오늘의 메뉴 저장
    $(".btn-save").on("click", async function () {
        const comment = $("#select-menu-text").val();

        if (!comment) {
            alert("코멘트를 입력하세요.");
            return;
        }

        initializePopup();
        const {dateInt} = await checkAndConvertDate();

        if (window.isEdit) {
            const checkDateResult = await checkDate(dateInt);
            const calendarMenuId = checkDateResult.menu_id;
            await updateCalendarByMenu(calendarMenuId, comment);
            window.isEdit = false;
        } else {
            if (selectedMenuId) {
                await addCalendarByMenu(selectedMenuId, comment);
            } else {
                alert("메뉴를 선택하세요.");
            }
        }

        // 저장 후 팝업 닫기
        $("#myForm2").hide();
        $(".popup-overlay").remove();
        selectedMenuId = null; // 선택한 메뉴 정보 초기화
    });

    // 오늘의 메뉴 수정
    $('.today-menu-container').on('click', '.btn-edit', async function () {
        const {dateInt} = await checkAndConvertDate();

        initializeAndShowPopup('#myForm2');
        $('#myForm').hide();

        const todayMenuData = await buildEditTodayMenu(dateInt);
        if (todayMenuData) {
            $("#select-menu-text").val(todayMenuData.comment);
            window.isEdit = true;
        } else {
            $("#select-menu-text").empty();
        }
    });

    // 오늘의 메뉴 삭제
    $(document).on("click", '.btn-delete', async function () {
        if (confirm("오늘의 메뉴를 삭제하시겠습니까?")) {
            const {dateInt, selectedDate} = await checkAndConvertDate();
            const checkDateResult = await checkDate(dateInt);
            const calendarMenuId = checkDateResult.menu_id;
            const calendarComment = checkDateResult.comment;

            let findSchedule = calendarlist.find(schedule => schedule.date === selectedDate);

            if (findSchedule) {
                await deleteCalendarByMenu(findSchedule.id, calendarMenuId, calendarComment);
            }
        }
    });

    function closePopup(popupId) {
        $(popupId).hide();
        popupOverlay.remove();
    }

    $('.btn-cancel').on('click', function () {
        closePopup('#myForm2');
    });

    $(".menu-close").on("click", function () {
        closePopup("#myForm");
    });

    $(".menu-close2").on("click", function () {
        closePopup("#myForm2");
    });

    popupOverlay.on("click", function () {
        closePopup("#myForm");
        closePopup("#myForm2");
    });

    /****************************************************************
                            메모 관련 이벤트
     ****************************************************************/

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

    // 메모 추가 했을 때 메모 입력 시 높이 조절
    $("#new-memo").on("input", function() {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    });

    $("#new-memo").on("blur", function () {
        $(this).val("").hide();
    });

    // 메모 저장 + 수정
    // 입력창에서 엔터키 누를 때 메모 저장
    $("#new-memo").on("keydown", async function (e) {
        if (e.key === "Enter") {
            const memoText = $("#new-memo").val();

            // 메모 수정할 때 저장할 때 구별
            if ($("#new-memo").data("mode") === "edit") {
                // TODO : 이부분이 문제야
                console.log(memoText);
                await updateCalendarByMemo(memoText);
            } else {
                await addCalendarByMemo(memoText);
            }
        } else if (e.key === "Escape") {
            $(this).val("").hide();
        }
    });

    // 메모 수정
    $("#btn-add-memo").on("click", function () {

        // 기존 메모가 없는 경우에만 추가 모드로 설정
        if ($(".event-list li").length === 0) {
            $("#new-memo").val("");
            $("#new-memo").css("height", "100px");
            $("#new-memo").data("mode", "add").show().focus();
            $("#notification").hide();

        // 기존 메모가 있는 경우 수정 모드로 설정
        } else {
            $(".event-list li").find(".memo-delete").remove();
            const memoText = $(".event-list li").text().trim();
            $("#new-memo").val(memoText).data("mode", "edit").show().focus();
            $(".event-list li").hide();
        }
    });

    // 메모 삭제
    $(document).on("click", ".memo-delete", async function () {
        if (confirm("메모를 삭제하시겠습니까?")) {
            const memoText = $("#new-memo").val();
            const selectedDate = init.activeDate.toISOString().split("T")[0];

            // 캘린더 리스트에서 해당 날짜 찾기
            let findSchedule = calendarlist.find(schedule => schedule.date === selectedDate);

            if (findSchedule) {
                await deleteCalendarByMemo(findSchedule.id, memoText);
            }
        }
    });

    /****************************************************************
                            캘린더 관련 이벤트
    ****************************************************************/

    // 날짜 클릭
    $(".date").on("click", function () {
        const selectedDate = $(this).data("date"); // 클릭한 날짜의 데이터 속성 값 가져오기
        alert(selectedDate);
    });
}