$(document).ready(function () {
    const init = {
        monList: [
            "1월",
            "2월",
            "3월",
            "4월",
            "5월",
            "6월",
            "7월",
            "8월",
            "9월",
            "10월",
            "11월",
            "12월",
        ],
        dayList: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
        today: new Date(),
        monForChange: new Date().getMonth(),
        activeDate: new Date(),
        getFirstDay: (yy, mm) => new Date(yy, mm, 1),
        getLastDay: (yy, mm) => new Date(yy, mm + 1, 0),
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
        event: [
            { date: "2024.06.05", memo: "오늘 바닥에 재료 쏟아서 청소해야합니다" },
            { date: "2024.06.06", memo: "재고 확인하고 더 주문해주세요" },
            { date: "2024.06.07", memo: "오늘 돈 안 맞아요" },
        ],
        menu: [
            {
                date: "2024.06.05",
                imgSrc: "../img/MaiTai.png",
                description:
                    "이 칵테일은 메뉴에서 가장 인기 있는 칵테일 중 하나예요. 상쾌한 맛과 아름다운 푸른색이 특징이죠. 한 모금 마시면 하와이의 해변에 온 듯한 기분을 느끼실 수 있을 거예요.",
            },
        ]
        // menuList: [
        //     { imgSrc: "../img/MaiTai.png", name: "Mai Tai" },
        //     { imgSrc: "../img/BlueHawaii.png", name: "Blue Hawaii" },
        //     { imgSrc: "../img/Eggnog.png", name: "Eggnog" },
        //     { imgSrc: "../img/HotTeddy.png", name: "Hot Teddy" },
        //     { imgSrc: "../img/MulledWine.png", name: "Mulled Wine" },
        // ],
    };

    $(".schedule-container").scroll(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(this).prop("scrollHeight");
        var clientHeight = $(this).prop("clientHeight");

        // 스크롤이 맨 위에 도달할 때
        if (scrollTop === 0) {
            $(this).addClass("scroll-top");
            setTimeout(function () {
                $(".schedule-container").removeClass("scroll-top");
            }, 500);
        }

        // // 스크롤이 맨 아래에 도달할 때
        // if (scrollTop + clientHeight >= scrollHeight) {
        //   $(this).addClass('scroll-bottom');
        //   setTimeout(function() {
        //     $('.schedule-container').removeClass('scroll-bottom');
        //   }, 500);
        // }
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
            const newEvent = {
                date: init.activeDate.toISOString().split("T")[0].replace(/-/g, "."),
                memo: $("#new-memo").val(),
            };
            init.event.push(newEvent); // 새로운 이벤트를 추가
            loadEvent(newEvent.date); // 해당 날짜의 이벤트를 로드
            $("#new-memo").val("").hide();
        } else if (e.key === "Escape") {
            $("#new-memo").val("").hide();
        }
    }

    // 오늘의 메뉴를 로드하는 함수
    function loadTodayMenu(date) {
        const menuData = init.menu.find((item) => item.date === date);

        if (menuData) {
            $("#notification-menu").hide();
            $(".today-menu-container").show();
            $(".today-menu-container .menu-img").attr("src", menuData.imgSrc);
            $(".today-menu-container .menu-text textarea").val(menuData.description);

            // 수정 및 삭제 버튼 활성화
            $(
                ".today-menu-container .btn-edit, .today-menu-container .btn-delete"
            ).prop("disabled", false);
        } else {
            $("#notification-menu").show();
            $(".today-menu-container").hide();
        }
    }

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
                    let eventClass = init.event.some((event) => event.date === fullDate)
                        ? " event"
                        : "";
                    // let hashId = generateHash(fullDate);

                    trtd += `<td class="day${eventClass}`;
                    trtd += markToday && markToday === countDay + 1 ? ' today" ' : '"';
                    trtd += ` data-date="${countDay + 1}" data-fdate="${fullDate}">`;
                    // trtd += `<a href="/calendar/${hashId}">`;

                    const menuExists = init.menu.some((menu) => menu.date === fullDate);
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
    }

    // 해시 값을 생성하는 함수
    // function generateHash(fullDate) {
    //     let hash = 0;
    //     for (let i = 0; i < fullDate.length; i++) {
    //         let char = fullDate.charCodeAt(i);
    //         hash = ((hash << 5) - hash) + char;
    //         hash = hash & hash;
    //     }
    //     return hash;
    // }

    // 특정 날짜의 메모를 로드하는 함수
    function loadEvent(date) {
        const events = init.event.filter((event) => event.date === date);
        const eventItems = events
            .map(
                (event) => `
        <li>${event.memo}
          <button type="button" class="memo-delete">
            <span class="fa fa-xmark">X</span>
          </button>
        </li>`
            )
            .join('<div class="memo-gap"></div>');
        $(".event-list").html(eventItems);

        // 마우스 오버 이벤트 처리
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

    // 버튼 클릭 시 알림창 숨기기
    $("#btn-add-memo").on("click", function () {
        showInput();
        $("#notification").hide();
    });

    // 닫기 버튼 클릭 시 알림창 숨기기
    $("#notification").on("click", function () {
        $("#notification").hide();
    });

    const popupOverlay = $('<div class="popup-overlay"></div>');

    // 메뉴 리스트 동적으로 추가
    // function loadMenuList() {
    //     $(".menu-list").empty();
    //     init.menuList.forEach((menu) => {
    //         const menuDiv = $(`
    //     <div class="menu">
    //       <img src="${menu.imgSrc}" alt="${menu.name}">
    //       <p class="menu-name">${menu.name}</p>
    //     </div>
    //   `);
    //         menuDiv.on("click", function () {
    //             openPopup2(menu);
    //         });
    //         $(".menu-list").append(menuDiv);
    //     });
    // }

    // 메뉴 팝업 열기
    $("#btn-add-menu").on("click", function () {
        $("body").append(popupOverlay);
        $("#myForm").show();
        // loadMenuList(); // 메뉴 리스트 로드
    });

    // 메뉴 팝업1 닫기
    function closePopup() {
        $("#myForm").hide();
        popupOverlay.remove();
    }

    // 메뉴 팝업2 열기
    function openPopup2(menu) {
        $("#myForm").hide();
        $(".select-menu img").attr("src", menu.imgSrc);
        $(".select-menu img").attr("alt", menu.name);
        $(".select-menu-name").text(menu.name);
        $("#myForm2").show();
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
