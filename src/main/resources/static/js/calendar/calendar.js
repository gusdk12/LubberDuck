$(document).ready(function () {

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

    // 메모 입력 시 높이를 자동으로 조절하는 함수
    function adjustHeight() {
        const newMemo = $("#new-memo");
        newMemo.css("height", "auto");
        newMemo.css("height", newMemo[0].scrollHeight + "px");
    }

    // 입력 시 높이 조절 및 포커스 아웃 시 숨김 처리
    $("#new-memo").on("input", adjustHeight);

    $("#new-memo").on("blur", function () {
        $(this).val("").hide();
    });

    // 메모 입력 창을 보여주는 함수
    function showInput() {
        const newMemo = $("#new-memo");
        newMemo.val("");
        newMemo.css("height", "90px"); // 기본 높이로 설정
        newMemo.show().focus();
        $("#notification").hide();
    }

    // 탭 키 이벤트 처리
    $(".schedule-container").on("keydown", function (e) {
        if (e.key === "Tab") {
            showInput();
            e.preventDefault(); // 기본 탭 이벤트 제거
        }
    });

    // 메모 입력 시 키보드 이벤트를 처리하는 함수
    function handleMemoKeyDown(e) {
        if (e.key === "Enter") {
            const memoText = $("#new-memo").val();
            const selectedDate = init.activeDate.toISOString().split("T")[0].replace(/-/g, ".");

            const newEvent = {
                date: selectedDate,
                memo: memoText,
            };

            let eventItems = `
            <li>${newEvent.memo}
                <button type="button" class="memo-delete">
                    <span class="fa fa-xmark">X</span>
                </button>
            </li>`;
            $(".event-list").html(eventItems);
            $("#notification").hide();

            console.log("Sending memo to server:", newEvent);

            $.ajax({
                type: "POST",
                url: "/admin/calendar/saveMemo",
                contentType: "application/json",
                data: JSON.stringify(newEvent),
                success: function (response) {
                    calendarlist.push(newEvent); // 서버에 저장된 메모를 로컬 데이터에도 추가
                    loadEvent(selectedDate); // 저장 후 해당 날짜의 메모를 갱신
                    $("#new-memo").val("").hide();
                    highlightEventDates();
                },
                error: function (xhr, status, error) {
                    console.error("Error saving memo:", error);
                },
                complete: function () {
                    $("#new-memo").val("").hide();
                }
            });
        } else if (e.key === "Escape") {
            $("#new-memo").val("").hide();
        }
    }

    // 특정 날짜의 메모를 로드하는 함수
    function loadEvent(date) {
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

    $(".date").on("click", function () {
        const selectedDate = $(this).data("date"); // 클릭한 날짜의 데이터 속성 값 가져오기
        loadEvent(selectedDate); // 해당 날짜의 메모 로드
    });

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

        highlightEventDates();

    }

    // 캘린더 셀에 이벤트 클래스 추가하는 함수
    function highlightEventDates() {
        calendarlist.forEach(event => {
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
            loadEvent(date);
            loadTodayMenu(date); // 오늘의 메뉴 로드
        }
    }

    // 달력을 초기화하는 함수
    function initCalendar() {
        loadYYMM(init.today);
        $(".btn-cal.next").on("click", () => loadYYMM(init.nextMonth()));
        $(".btn-cal.prev").on("click", () => loadYYMM(init.prevMonth()));
        $(".cal-body").on("click", "td", handleDayClick);
    }

    $("#new-memo").on("keydown", handleMemoKeyDown);

    initCalendar();

    // 버튼 클릭 시 메모 입력 창 열기
    $("#btn-add-memo").on("click", function () {
        showInput();
    });

    // 닫기 버튼 클릭 시 알림창 숨기기
    $("#notification").on("click", function () {
        $("#notification").hide();
    });

    // 오늘의 메뉴를 로드하는 함수 (DB와 연동되는 부분은 여기서 구현)
    function loadTodayMenu(date) {
        // DB에서 오늘의 메뉴를 로드하는 로직을 호출
        console.log("Loading menu for date:", date);
    }

    const popupOverlay = $('<div class="popup-overlay"></div>');

    // 메뉴 팝업 열기
    $("#btn-add-menu").on("click", function () {
        $("body").append(popupOverlay);
        $("#myForm").show();
    });

    // 메뉴 팝업1 닫기
    function closePopup() {
        $("#myForm").hide();
        popupOverlay.remove();
    }

    // 메뉴 클릭 시 팝업2 열기
    $(".menu").on("click", function () {
        const menuId = $(this).data("menu-id");
        const menu = menuList.find(m => m.id === menuId);

        if (menu) {
            $("body").append(popupOverlay);
            $("#myForm").hide();
            openPopup2(menu);
            console.log(menu);
        } else {
            console.error("Menu not found for id: " + menuId);
        }
    });

    // 메뉴 팝업2 열기
    function openPopup2(menu) {
        $(".selected-menu-img").attr("src", menu.imgUrl);
        $(".selected-menu-img").attr("alt", menu.name);
        $(".select-menu-name").text(menu.name);
        $("#myForm2").show();
    }

    // 메뉴 클릭 시 팝업2 열기
    $(".menu").on("click", function () {

        fetchMenuDetail(menuList.find(menu => menu.id === cocktailId));
        openPopup2(menu);

    });

// 팝업2 열기 함수
    function openPopup2(menu) {
        $(".selected-menu-img").attr("src", menu.imgUrl); // 이미지 소스 설정
        $(".selected-menu-img").attr("alt", menu.name); // 이미지 대체 텍스트 설정
        $(".select-menu-name").text(menu.name); // 메뉴 이름 설정
        $("#myForm2").show(); // 팝업2 보이기
    }

    // 메뉴 팝업2 닫기
    function closePopup2() {
        $("#myForm2").hide();
        popupOverlay.remove();
    }

    $(".menu-close").on("click", function () {
        closePopup();
    });

    $(".menu-close2").on("click", function () {
        closePopup2();
    });

    popupOverlay.on("click", function () {
        closePopup();
        closePopup2();
    });
});

async function fetchMenuDetail(cocktail) {
    try {
        const response = await $.ajax({
            url: "/admin/calendar/menu/" + cocktail.id, // 실제 요청하는 URL
            type: "GET",
            cache: false,
        });
        console.log("Menu detail fetched successfully:", response);
        // 서버에서 반환된 데이터를 처리하거나 화면에 표시할 수 있습니다.
    } catch (error) {
        console.error("Error fetching menu detail:", error);
    }
}