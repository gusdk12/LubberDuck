$(document).ready(function(){
    // 사이드바 메뉴 클릭시 css 변경
    $('.sm').eq(1).css({
        'background-color':'#FCF7EF',
        'border-radius' : "10px 0 0 10px",
        'color' : '#54320f',
        'font-weight': 'bold'
    });

    $(document).on('click', '#submit_btn', function (event) {
        event.preventDefault(); // 기본 제출 동작 방지

        var itemId = $(this).closest('#review-form').find('input[name="item_id"]').val();
        var selectedRating = $('.rating input:checked').val(); // 선택된 별점 값 가져오기
        var content = $('#content').val();

        // 기존 오류 메시지 제거
        $('.error').text('');

        var isValid = true;

        // 별점이 선택되지 않은 경우 에러 메시지 출력
        if (!selectedRating) {
            $('#rateError').text('별점을 선택해주세요.');
            $('#rateError').show();
            isValid = false;
        } else {
            $('#rateError').hide();
        }

        // 리뷰 내용이 20자 미만인 경우 에러 메시지 출력
        if (content.length < 20) {
            $('#contentError').text('리뷰 내용을 20자 이상 작성해주세요.');
            $('#contentError').show();
            isValid = false;
        }  else if (content.length > 500) { // 리뷰 내용이 500자를 초과하는 경우
            $('#contentError').text('리뷰 내용은 500자 이하여야 합니다.');
            $('#contentError').show();
            isValid = false;
        } else {
            $('#contentError').hide();
        }

        if (!isValid) {
            return;
        }

        $.ajax({
            url: '/review/insert',
            type: 'POST',
            data: {
                "item_id": itemId,
                "rate": selectedRating,
                "comment": content,
            },
            cache: false,
            success: function (response) {
                swal("리뷰 작성 성공!","리뷰 목록에서 리뷰를 확인해주세요.","success")
                    .then(function (){
                        window.location.href = '/mypage/review'; // 리뷰 목록 페이지로 리디렉션
                    })
            },
            error: function (error) {
                swal("리뷰 작성 실패!","다시 작성해주세요.","warning")
            }
        });
    });

    buildBody(); // buildBody를 호출하여 본문을 만듭니다.

    $(document).on('click', '.modal_btn', function(){
        closeAllModals(); // Close all modals before opening a new one

        const reviewId = $(this).data('review-id');
        const reviewContent = $(this).data('review-content');
        const reviewRegdate = $(this).data('review-regdate');
        const reviewMenuName = $(this).data('review-menu-name');
        const reviewRate = $(this).data('review-rate');
        const modalContent =
            `<div id="review-form">
            <h3>리뷰 상세보기</h3>
            <span class="form-group">
                <label for="title" class="form-left">메뉴 이름</label>
                <input type="text" id="title" name="title" class="detailReview" value="${reviewMenuName}" disabled><br><br><hr>
            </span>
            <div class="form-group">
                <label for="name" class="form-left">주문 일시</label>
                <input type="text" id="name" name="name" class="detailReview" value="${formatDateTime(reviewRegdate)}" disabled><br><hr>
            </div>
            <div class="form-group rating-group">
                <label for="rate" class="form-left">별점</label>
                <div class="rating" id="star_rate">
                    <input type="radio" name="rate" value="5" id="star5" ${reviewRate == 5 ? 'checked' : ''} disabled><label for="star5"></label>
                    <input type="radio" name="rate" value="4" id="star4" ${reviewRate == 4 ? 'checked' : ''} disabled><label for="star4"></label>
                    <input type="radio" name="rate" value="3" id="star3" ${reviewRate == 3 ? 'checked' : ''} disabled><label for="star3"></label>
                    <input type="radio" name="rate" value="2" id="star2" ${reviewRate == 2 ? 'checked' : ''} disabled><label for="star2"></label>
                    <input type="radio" name="rate" value="1" id="star1" ${reviewRate == 1 ? 'checked' : ''} disabled><label for="star1"></label>
                </div>
            </div>
            <hr>
            <div id="rateError" class="error"></div>
            <div class="form-group">
                <label for="content" class="form-left">리뷰 내용</label>
                <textarea id="content" name="content" rows="8" cols="80" class="detailReview" readonly>${reviewContent}</textarea>
                <div id="contentError" class="error"></div>
            </div>
            <div class="text-center">
                <button type="button" id="back_button">닫기</button>
                <h5> * 작성하신 리뷰는 <마이페이지-나의리뷰>에서 확인하실 수 있습니다.</h5>
            </div>
        </div>`;

        $('#modalContent').html(modalContent);

        // 모달 위치를 클릭한 버튼 옆으로 이동
        const buttonOffset = $(this).offset();
        const modalWidth = $('#reviewModal').outerWidth();
        const modalHeight = $('#reviewModal').outerHeight();

        $('#reviewModal').css({
            top: buttonOffset.top - modalHeight / 2 + 'px',
            left: buttonOffset.left + $(this).outerWidth() + 'px'
        }).show();

        // 다른 모달 숨기기
        $('#writeModal').hide();
    });

    // 리뷰 작성 모달 닫을 때 초기화
    $('#writeModal').on('hidden.bs.modal', function () {
        $('#writeContent').html(''); // 모달 내용 초기화
    });

    $(document).on('click', '#back_button', function(){
        $('#reviewModal').hide(); // 모달을 숨깁니다.
        $('#modalContent').html('');
    });

    $(document).on('click', '.write_btn', function(){
        closeAllModals(); // Close all modals before opening a new one

        const reviewItemId = $(this).data('item-id');
        const reviewItemOrderRegdate = $(this).data('item-order-regdate');
        const reviewItemMenuName = $(this).data('item-menu-name');
        const writeContent =
            `<div id="review-form">
            <input type="hidden" name="item_id" value="${reviewItemId}">
            <button type="button" id="back_btn">X</button>
            <h3>리뷰 작성하기</h3>
            <span class="form-group">
                <label for="title" class="form-left">메뉴 이름</label>
                <input type="text" id="title" name="title" class="writeReview" value="${reviewItemMenuName}" disabled><br><br><hr>
            </span>
            <div class="form-group">
                <label for="name" class="form-left">주문 일시</label>
                <input type="text" id="name" name="name" class="writeReview" value="${formatDateTime(reviewItemOrderRegdate)}" disabled><br><hr>
            </div>
            <div class="form-group rating-group">
                <label for="rate" class="form-left" >별점</label>
                <div class="rating" id="star_rate" name="write_rate" aria-required="true">
                    <input type="radio" name="rate" value="5" id="star5"><label for="star5"></label>
                    <input type="radio" name="rate" value="4" id="star4"><label for="star4"></label>
                    <input type="radio" name="rate" value="3" id="star3"><label for="star3"></label>
                    <input type="radio" name="rate" value="2" id="star2"><label for="star2"></label>
                    <input type="radio" name="rate" value="1" id="star1"><label for="star1"></label>
                </div>
            </div>
            <div id="rateError" class="error"></div>
            <hr>
            <div class="form-group">
                <label for="content" class="form-left">리뷰 내용</label>
                <textarea id="content" class="writeReview" rows="8" cols="80" required></textarea>
                <div id="contentError" class="error"></div>
            </div>
            <div class="text-center">
                <button type="button" id="submit_btn">작성 완료</button>
                <h5> * 작성하신 리뷰는 <마이페이지-나의리뷰>에서 확인하실 수 있습니다.</h5>
            </div>
        </div>`;

        $('#writeContent').html(writeContent);

        // 모달 위치를 클릭한 버튼 옆으로 이동
        const buttonOffset = $(this).offset();
        const modalWidth = $('#writeModal').outerWidth();
        const modalHeight = $('#writeModal').outerHeight();

        $('#writeModal').css({
            top: buttonOffset.top - modalHeight / 2 + 'px',
            left: buttonOffset.left + $(this).outerWidth() + 'px'
        }).show();

        // 다른 모달 숨기기
        $('#reviewModal').hide();
    });

    $(document).on('click', '#back_btn', function(){
        $('#writeModal').hide(); // 모달을 숨깁니다.
    });

    $(document).on('click', '#back_button', function(){
        $('#reviewModal').hide(); // 모달을 숨깁니다.
    });

    $(document).on('click', '#back_btn', function(){
        $('#writeModal').hide(); // 모달을 숨깁니다.
    });

    // buildBody 이후에 정렬을 수행해야 합니다.
    var ordersContainer = $('.container');
    var orders = ordersContainer.find(".receipt");

    orders.sort(function (a, b){
        var dateA = $(a).find('.order-nm').text();
        var dateB = $(b).find('.order-nm').text();
        return new Date(dateB) - new Date(dateA); // 최신순 정렬
    });

    orders.detach().appendTo(ordersContainer); // 정렬된 주문을 다시 추가합니다.
});

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // 두 자리 숫자를 맞추기 위해 padStart 사용
    const formattedDate = `${year}년 ${month}월 ${day}일 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedDate;
}

function buildBody(){
    $('.container').empty(); // 중복을 피하기 위해 컨테이너를 비웁니다.

    if (orderList == null) {
        // 주문이 없는 경우
        $('.container').append('<div class="no-orders">' +
            '<img id="icon" src="/img/mypage/order-icon.png">' +
            '<p>주문 내역이 없습니다.</p>' +
            '<a href="/home">홈으로 가기</a>' +
            '</div>');
        return;
    }

    orderList.forEach(order => {
        let itemsHTML = "";
        let totalPrice = 0;

        orderItemMap[order.id].forEach(item => {
            let buttonHTML = "";
            const findReview = itemReviewMap[item.id];
            if (findReview) {
                buttonHTML = `<input type="button" value="리뷰확인" name="reviewBtn" class="modal_btn" data-review-id="${findReview.id}" data-review-content="${findReview.content}" data-review-rate="${findReview.rate}" data-review-regdate="${findReview.regdate}" data-review-menu-name="${findReview.menu.name}">`;
            } else {
                buttonHTML = `<input type="button" value="리뷰작성" name="reviewBtn" class="write_btn" data-item-id="${item.id}" data-item-menu-name="${item.menu.name}" data-item-order-regdate="${item.order.regdate}">`;
            }

            let formattedItemPrice = item.price.toLocaleString('ko-KR');
            itemsHTML += `
                <div class="items">
                    <div class="item">
                        <span class="item-name">${item.menu.name}</span>
                        <span class="quantity">${item.quantity}</span>
                        <span class="item-price">${formattedItemPrice}</span>
                        <span>
                            ${buttonHTML}
                        </span>
                    </div>
                </div>`;
            totalPrice += (item.price * item.quantity);
        });

        let formattedTotalPrice = totalPrice.toLocaleString('ko-KR');

        let formattedRegDate = formatDateTime(order.regdate);

        $('.container').append(`
            <div class="receipt">
                <div class="background">
                    <img src="/img/mypage/receipt.png">
                </div>
                <div class="content">
                    <h2 class="shopname">LubberDuck</h2>
                    <div class="header-info">
                        <p class="name">${user.nickname}님</p>
                        <p class="date-time">${formattedRegDate}</p>
                    </div>
                    <p class="order-nm">주문번호: ${order.id}</p>
                    <div class="dashed"></div>
                    <div class="item-header">
                        <span class="menuName">&lt;메뉴이름&gt;</span>
                        <span class="quantity">&lt;주문수량&gt;</span>
                        <span class="menuPrice">&lt;메뉴가격&gt;</span>
                        <span class="review">&lt;리뷰작성&gt;</span>
                    </div>
                    <div class="dashed"></div>
                    ${itemsHTML}
                    <div class="dashed"></div>
                    <div class="totals">
                        <div class="total-item">
                            <span class="total-price"></span>
                            <span class="total-price">TOTAL : ${formattedTotalPrice}원</span>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });

    $('body').append(`
        <div id="reviewModal" class="modal" style="position: absolute; display: none;">
                <p id="modalContent"></p>
        </div>
    `);

    $('body').append(`
        <div id="writeModal" class="modal" style="position: absolute; display: none;">
                <p id="writeContent"></p>
        </div>
    `);
}

function closeAllModals() {
    $('#reviewModal').hide();
    $('#writeModal').hide();
    $('#modalContent').html('');
    $('#writeContent').html('');
}
