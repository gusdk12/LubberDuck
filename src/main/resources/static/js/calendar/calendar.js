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

    // 메모 추가 했을 때 메모 입력 시 높이 조절
    $("#new-memo").on("input", function() {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    });

    $("#new-memo").on("blur", function () {
        $(this).val("").hide();
    });

    // 메모 저장
    // 입력창에서 엔터키 누를 때 메모 저장
    $("#new-memo").on("keydown", function (e) {
        if (e.key === "Enter") {
            const memoText = $("#new-memo").val();

            // 메모 수정할 때 저장할 때 구별
            if ($("#new-memo").data("mode") === "edit") {
                const selectedDate = init.activeDate.toISOString().split("T")[0];
                let findSchedule = calendarlist.find(schedule => schedule.date === selectedDate);
                updateCalendarByMemo(findSchedule.id, memoText);
            } else {
                addCalendarByMemo(memoText);
            }

            $(this).val("").hide();
        } else if (e.key === "Escape") {
            $(this).val("").hide();
        }
    });

    // 메모 수정
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

    // 메모 삭제
    // 캘린더 데이터에서 메모만 null 로 설정하기
    $(document).on("click", ".memo-delete", async function () {
        // 삭제 확인 대화상자 표시
        if (confirm("메모를 삭제하시겠습니까?")) {
            const selectedDate = init.activeDate.toISOString().split("T")[0];

            // 캘린더 리스트에서 해당 날짜 찾기
            let findSchedule = calendarlist.find(schedule => schedule.date === selectedDate);

            if (findSchedule) {
                if (findSchedule.menu) {
                    await deleteToUpdateCalendarByMemo(findSchedule.id);
                } else {
                    await deleteCalendarByMemo(findSchedule.id);
                }
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
    });

// --------------------------------------------------------
// 오늘의 메뉴 관련 Event

    // 메뉴 리스트 팝업 열기
    $("#btn-add-menu").on("click", async function () {
        const selectedDate = init.activeDate.toISOString().split("T")[0];
        let dateStr = selectedDate.replace(/-/g, '');
        let dateInt = Number(dateStr);

        const checkDateResult = await checkDate(dateInt);
        if (checkDateResult.exists && checkDateResult.menu_id) {
            alert("이미 메뉴가 존재합니다.");
            return;
        }

        $("body").append(popupOverlay);
        $("#myForm").show();
        window.isEdit = false;
    });

    // 메뉴 클릭 시 오늘의 메뉴 디테일 팝업 열기
    $(".menu").on("click", function () {
        // 이전 이벤트 핸들러 제거
        $(".btn-save").off("click");
        initializePopup();

        // 메뉴 정보 가져오기
        menuId = $(this).data("menu-id");
        let menu = menuList.find(m => m.id === menuId);

        if (menu) {
            $("body").append(popupOverlay);
            $("#myForm").hide();
            $("#myForm2").show();
            $(".select-menu-img").attr("src", menu.imgUrl);
            $(".select-menu-img").attr("alt", menu.name);
            $(".select-menu-name").text(menu.name);
        } else {
            console.error("Menu not found.");
            return;
        }

        // 오늘의 메뉴 저장
        $(".btn-save").on("click", async function() {
            const comment = $("#select-menu-text").val();
            if (!comment) {
                alert("코멘트를 입력하세요.");
                return;
            }

            initializePopup();
            if (window.isEdit) {
                const selectedDate = init.activeDate.toISOString().split("T")[0];
                let dateStr = selectedDate.replace(/-/g, '');
                let dateInt = Number(dateStr);
                const checkDateResult = await checkDate(dateInt);
                const calendarMenuId = checkDateResult.menu_id;

                await updateCalendarByMenu(calendarMenuId, comment);
                window.isEdit = false; // 초기화
            } else {
                await addCalendarByMenu(menuId, comment);
            }

            // 저장 후 팝업 닫기
            $("#myForm2").hide();
            $(".popup-overlay").remove();
        });
    });

    // 오늘의 메뉴 수정
    $('.today-menu-container').on('click', '.btn-edit', async function() {
        const selectedDate = init.activeDate.toISOString().split("T")[0];
        let dateStr = selectedDate.replace(/-/g, '');
        let dateInt = Number(dateStr);

        $("body").append(popupOverlay);
        $('#myForm2').show();
        initializePopup();

        // 저장된 오늘의 메뉴 데이터를 불러와서 팝업창에 표시
        const todayMenuData = await buildEditTodayMenu(dateInt);
        if (todayMenuData) {
            $("#select-menu-text").val(todayMenuData.comment);
            window.isEdit = true;
        } else {
            $("#select-menu-text").empty();
        }

        window.isEdit = true;
    });

    // 오늘의 메뉴 삭제
    $('.today-menu-container').on('click', '.btn-delete', async function() {
        if (confirm("오늘의 메뉴를 삭제하시겠습니까?")) {
            const selectedDate = init.activeDate.toISOString().split("T")[0];

            // 캘린더 리스트에서 해당 날짜 찾기
            let findSchedule = calendarlist.find(schedule => schedule.date === selectedDate);

            if (findSchedule) {
                if (findSchedule.memo) {
                    await deleteToUpdateCalendarByMenu(findSchedule.id);
                } else {
                    await deleteCalendarByMenu(findSchedule.id);
                }
            } else {
                console.error("No schedule found for the selected date");
            }
        }
    });

    // 오늘의 메뉴 취소
    $('.btn-cancel').on('click', function() {
        $('#myForm2').hide();
        popupOverlay.remove();
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
// --------------------------------------------------------