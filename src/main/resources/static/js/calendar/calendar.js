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
    // loadCalendars();
    loadYYMM(init.today);
    addEvents();
    $("#menunav").show();
});

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
    $("#btn-add-menu, .change-menu-button").on("click", async function () {
        initializeAndShowPopup("#myForm");
        window.isMenuEdit = false;
        $("#myForm").show();
        $("#myForm2").hide();
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

        if (comment.length > 300) {
            alert("입력된 글자 수가 300자를 초과했습니다.");
            return;
        }

        initializePopup();
        const {dateInt} = await checkAndConvertDate();

        if (window.isMenuEdit) {
            const checkDateResult = await checkDate(dateInt);
            const calendarMenuId = checkDateResult.menu_id;
            await updateCalendarByMenu(calendarMenuId, comment);
            window.isMenuEdit = false;
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
            window.isMenuEdit = true;
        } else {
            $("#select-menu-text").empty();
        }

    });

    // 오늘의 메뉴 삭제
    $(document).on("click", '.btn-delete', async function () {
        if (confirm("오늘의 메뉴를 삭제하시겠습니까?")) {
            const {dateInt} = await checkAndConvertDate();
            const checkDateResult = await checkDate(dateInt);

            if (checkDateResult.exists) {
                await deleteCalendarByMenu(checkDateResult.id, checkDateResult.menu_id, checkDateResult.comment);
            }
        }
    });

    // 팝업 닫기 관련 함수
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
                        일정 메모 관련 이벤트
     ****************************************************************/

    // 메모 부분 스크롤
    $(".event-list li").scroll(function () {
        var scrollTop = $(this).scrollTop();

        // 스크롤이 맨 위에 도달할 때
        if (scrollTop === 0) {
            $(this).addClass("scroll-top");
            setTimeout(function () {
                $(".event-list li").removeClass("scroll-top");
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
            e.preventDefault();
            const memoText = $("#new-memo").val();

            // 메모 수정할 때 저장할 때 구별
            if ($(this).data("mode") === "edit") {
                await updateCalendarByMemo(memoText);
            } else {
                await addCalendarByMemo(memoText);
            }
        } else if (e.key === "Escape") {
            $(this).val("").hide();
        }
    });

    // 메모 추가
    $("#btn-add-memo").on("click", async function () {
        // 기존 메모가 없는 경우에만 추가 모드로 설정
        if ($(".event-list li").length === 0) {
            $("#new-memo")
                .val("")
                .css("height", "100px")
                .data("mode", "add")
                .show()
                .focus();
            $(".notification-text").hide();
        } else {
            $(".notification-text").show();
        }
    });

    // 메모 수정
    $(document).on("click", ".memo-edit", function () {

        // 기존 메모가 있는 경우 수정 모드로 설정
        if ($(".event-list li").length !== 0) {

            $(".memo-delete, .memo-edit").hide();

            const memoText = $(".event-list li").text().trim();

            // 기존 메모 높이 가져오기
            const existingMemoHeight = $(".event-list li").outerHeight();

            // 수정 모드로 설정하면서 높이 설정
            $("#new-memo").val(memoText)
                .css("height", existingMemoHeight + "px")
                .data("mode", "edit")
                .show()
                .focus();
            $(".event-list li").hide();
        }
    });

    // 메모 삭제
    $(document).on("click", ".memo-delete", async function () {
        if (confirm("메모를 삭제하시겠습니까?")) {
            const memoText = $("#new-memo").val();
            const {dateInt} = await checkAndConvertDate();
            const checkDateResult = await checkDate(dateInt);

            if (checkDateResult.exists) {
                await deleteCalendarByMemo(checkDateResult.id, memoText);
            }
        }
    });

    /****************************************************************
                            캘린더 관련 이벤트
    ****************************************************************/

    // 다음달 클릭
    $(".btn-cal.next").on("click", () => loadYYMM(init.nextMonth()));

    // 이전달 클릭
    $(".btn-cal.prev").on("click", () => loadYYMM(init.prevMonth()));

    // 날짜 클릭
    $(".date").on("click", function () {
        const selectedDate = $(this).data("date"); // 클릭한 날짜의 데이터 속성 값 가져오기
        alert(selectedDate);
    });

    // 사용자가 클릭한 날짜 표시
    $(".cal-body").on("click", "td", function(e) {
        const target = $(e.target);
        if (target.hasClass("day")) {

            // 현재 활성화된 날짜 태그가 존재하는 경우, 'day-active' 클래스 제거
            if (init.activeDTag) {
                init.activeDTag.removeClass("day-active");
            }
            let day = Number(target.text()); // 클릭된 날짜의 숫자 값을 가져옴
            let date = target.data("fdate"); // 클릭된 날짜의 'fdate' 데이터 속성을 가져옴

            // 클릭된 날짜에 'day-active' 클래스 추가 (활성화 상태 표시)
            target.addClass("day-active");

            // init 객체의 활성화된 날짜 태그를 클릭된 날짜로 업데이트
            init.activeDTag = target;
            init.activeDate.setDate(day);

            // String 타입인 date 를 int 타입으로 바꾸기
            if (date) {
                let dateStr = date.replace(/\./g, '');
                let dateInt = Number(dateStr);
                loadData(dateInt);
            }
        }
    });
}

/****************************************************************
                     화면 구성 및 초기화
 ****************************************************************/

/*** 캘린더 관련 화면 구성 ***/
// 캘린더를 구성하고 초기화
function buildCalendar(data){
    if(!data) return;

    // 데이터가 있는 경우
    data.forEach(date => {
        const year = date.id.toString().substring(0, 4);
        const month =  date.id.toString().substring(4, 6);
        const day =  date.id.toString().substring(6, 8);

        const cell = $(`.cal-body td[data-fdate="${year}.${month}.${day}"]`);

        // 날짜에 데이터가 있으면 색상 표시
        cell.addClass("event");
    });
}

// 실시간으로 날짜에 데이터가 있으면 색상 표시
function addEvent(dateId) {
    const year = dateId.toString().substring(0, 4);
    const month = dateId.toString().substring(4, 6);
    const day = dateId.toString().substring(6, 8);

    const cell = $(`.cal-body td[data-fdate="${year}.${month}.${day}"]`);
    cell.addClass("event");
}

// 실시간으로 날짜에 데이터가 없으면 색상 표시 해제
function removeEvent(dateId) {
    const year = dateId.toString().substring(0, 4);
    const month = dateId.toString().substring(4, 6);
    const day = dateId.toString().substring(6, 8);

    const cell = $(`.cal-body td[data-fdate="${year}.${month}.${day}"]`);
    cell.removeClass("event");
}

// 달력에 년도와 월을 로드
function loadYYMM(fullDate) {
    clearTodayMenuMemo();
    let yy = fullDate.getFullYear(); // 년도
    let mm = fullDate.getMonth(); // 월 (0부터 시작)
    let firstDay = new Date(yy, mm, 1); // 해당 월의 첫째 날
    let lastDay = new Date(yy, mm + 1, 0); // 해당 월의 마지막 날
    let markToday;

    // 오늘 날짜를 표시하기 위한 변수 설정
    if ((mm) === init.today.getMonth() && yy === init.today.getFullYear()) {
        markToday = init.today.getDate();
    }

    // 월과 년도를 UI에 표시
    $(".cal-month").text(init.monList[mm]);
    $(".cal-year").text(yy + "년");

    let trtd = "";
    let startCount; // 첫째 주 시작 여부
    let countDay = 0; // 날짜 카운트 변수 초기화
    for (let i = 0; i < 6; i++) { // 6주(행)까지 반복
        trtd += "<tr>";
        for (let j = 0; j < 7; j++) { // 7일(열)까지 반복
            if (i === 0 && !startCount && j === firstDay.getDay()) {
                startCount = 1; // 첫째 주 첫째 날을 시작으로 표시
            }
            if (!startCount) {
                trtd += "<td>"; // 첫째 주 시작 전에는 빈 td 요소 추가
            } else {
                // 각 날짜에 대한 정보 설정
                let fullDate =
                    yy + "." + init.addZero(mm + 1) + "." + init.addZero(countDay + 1); // 날짜 포맷 설정

                trtd += `<td class="day`;  // td 요소에 클래스 추가
                trtd += markToday && markToday === countDay + 1 ? ' today" ' : '"'; // 오늘 날짜인 경우 클래스 추가
                trtd += ` data-date="${countDay + 1}" data-fdate="${fullDate}">`; // 데이터 속성 추가

            }
            trtd += startCount ? ++countDay : ""; // 날짜 카운트 증가
            if (countDay === lastDay.getDate()) {
                startCount = 0; // 마지막 날짜에 도달하면 첫째 주 표시 종료
            }
            trtd += "</td>";
        }
        trtd += "</tr>";
    }
    $(".cal-body").html(trtd);

    loadCalendars();
}

/*** 메모, 메뉴 관련 화면 구성 ***/
// 메모, 메뉴 표시 초기화
function clearTodayMenuMemo(){
    // 메뉴 데이터 및 내용 비우기
    $('.today-menu-container').empty();
    initializePopup();

    // 메모 데이터 및 내용 비우기
    $(".event-list").empty();
    $(".notification-text").show();
    $(".notification-menu-text").show();
    $("#btn-add-memo").show();
}

// 이전 날짜인지 여부를 확인하는 함수
function isPastDate(date) {
    const currentDate = new Date(); // 현재 날짜
    const compareDate = new Date(date); // 비교할 날짜

    // 현재 날짜의 년, 월, 일 정보를 가져옴
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    // 비교할 날짜의 년, 월, 일 정보를 가져옴
    const compareYear = compareDate.getFullYear();
    const compareMonth = compareDate.getMonth();
    const compareDay = compareDate.getDate();

    // 두 날짜의 연, 월, 일이 모두 같은지 비교하여 하루 이전인지 확인
    return compareYear < currentYear ||
        compareMonth < currentMonth ||
        compareDay < currentDay;
}

/*** 메뉴 관련 화면 구성 ***/
// 오늘의 메뉴 화면에 표시
function buildTodayMenu(data) {
    // 오늘의 메뉴 데이터가 없는 경우
    if(!data.menu_id) {
        $("#btn-add-menu").show();
        $('.notification-menu-text').show();
        return;
    }

    // 오늘의 메뉴 데이터가 있는 경우
    $("#btn-add-menu").hide();
    $('.notification-menu-text').hide();

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
                <p class="edit-disabled-text">이전 날짜의 메뉴는 수정할 수 없습니다.</p>
                <button class="btn-edit"></button>
                <button class="btn-delete"></button>
            </div>
        </div>
    `);

    // 이전 날짜에는 버튼 숨기기
    // 이전 날짜일 경우
    if (isPastDate(data.date)) {
        $(".btn-edit").hide();
        $(".btn-delete").hide();
        $(".edit-disabled-text").show();
        $(".btn-add-menu").hide(); // 왜 안돼?
        // $(".notification-menu-text").text("오늘의 메뉴를 추가할 수 없습니다.");
        // 이후 날짜일 경우
    } else {
        $(".btn-edit").show();
        $(".btn-delete").show();
        $(".edit-disabled-text").hide();
        $(".btn-add-menu").show();
        $(".notification-menu-text").text("등록한 오늘의 메뉴가 없습니다.");
    }

}

// 오늘의 메뉴 데이터를 가져오는 함수
async function buildEditTodayMenu(dateInt) {

    const checkDateResult = await checkDate(dateInt);
    if (!checkDateResult.exists) {
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

/*** 메모 관련 화면 구성 ***/
// 메모 화면에 표시
async function buildMemo(data) {
    // 메모 데이터가 없는 경우
    if (!data.memo) {
        $('.notification-text').show();
        return;
    }

    $("#btn-add-memo").hide();
    $('.notification-text').hide();

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