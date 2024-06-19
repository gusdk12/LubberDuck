$(document).ready(function() {

    // 사이드바 메뉴 클릭시 css 변경 => 가연 추가!
    $('.sm').eq(2).css({
        'background-color':'#FBF5ED',
        'border-radius' : "10px 0 0 10px",
        'color' : '#54320f',
        'font-weight': 'bold'
    });

    buildBody();

    // 페이지 로드 시 최신순으로 정렬되도록 설정
    var reviewsContainer = $('.list'); // 리뷰 목록이 담긴 컨테이너
    var reviews = reviewsContainer.find('.reviews-container'); // 각 리뷰 요소들

    reviews.sort(function(a, b) {
        var dateA = $(a).find('.review-date').text(); // 리뷰 날짜 가져오기
        var dateB = $(b).find('.review-date').text();
        return new Date(dateB) - new Date(dateA); // 최신순 정렬
    });

    // 정렬된 리뷰 목록을 다시 컨테이너에 추가
    reviews.detach().appendTo(reviewsContainer);

    // 최신순, 별점순 라디오 버튼 클릭 시 처리
    $('input[name="sort"]').change(function() {
        var sortType = $(this).val(); // 선택된 정렬 타입 (최신순 또는 별점순)

        // 최신순으로 정렬
        if (sortType === '최신순') {
            reviews.sort(function(a, b) {
                var dateA = $(a).find('.review-date').text(); // 리뷰 날짜 가져오기
                var dateB = $(b).find('.review-date').text();
                return new Date(dateB) - new Date(dateA); // 최신순 정렬
            });
        }
        // 별점순으로 정렬
        else if (sortType === '별점순') {
            reviews.sort(function(a, b) {
                var ratingA = $(a).find('.star_score').text(); // 리뷰 별점 가져오기
                var ratingB = $(b).find('.star_score').text();
                return ratingB - ratingA; // 별점순 정렬
            });
        }

        // 정렬된 리뷰 목록을 다시 컨테이너에 추가
        reviews.detach().appendTo(reviewsContainer);
    });
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

    orderItemMap[review.id].forEach(item => {
        let itemsHTML = "";
        reviewList.forEach(review => {
            itemsHTML += `
                
                 <div class="reviews-container">
                        <div class="review">
                            <img th:src="${item.menu.imgUrl}">
                            <div>
                                <div class="review-content">
                                    <div class="review-header">
                                        <p>CloverClub</p>
                                        <div class="review-rating">
                                            <span class="star">★★★★★</span>
                                            <span class="star_score" th:value="${review.rate}">5</span>
                                        </div>
                                    </div>
                                    <div class="review-text" th:value="${review.content}">고단한 삶 속에서...</div>
                                    <div class="extra-buttons">
                                        <div class="review-date" th:value="${formattedRegDate}">2024-06-10</div>
                                        <button class="btn-update">수정</button>
                                        <button class="btn-delete">삭제</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>';
                    });
                    
        //          <div class="items">
        //             <div class="item">
        //                 <span class="item-name">${item.menu.name}</span>
        //                 <span class="quantity">${item.quantity}</span>
        //                 <span class="item-price">${formattedItemPrice}</span>
        //                 <span>
        //                     <input type="button" value="리뷰작성" name="reviewBtn" onclick="location.href='/review/write'">
        //                 </span>
        //             </div>
        //        </div>`;
        //     totalPrice += (item.price * item.quantity);
        // });

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
}


document.addEventListener('DOMContentLoaded', function() {
    const reviewTexts = document.querySelectorAll('.review-text');

    reviewTexts.forEach(text => {
        text.addEventListener('click', () => {
            const reviewContent = text.parentElement;
            const extraButtons = reviewContent.querySelector('.extra-buttons');

            // 다른 review-text들의 확장 상태를 초기화하고 추가 버튼을 숨깁니다.
            reviewTexts.forEach(otherText => {
                if (otherText !== text) {
                    otherText.classList.remove('expanded');
                    otherText.parentElement.querySelector('.extra-buttons').classList.remove('show');
                }
            });

            // 현재 클릭한 review-text와 해당하는 추가 버튼의 상태를 toggle합니다.
            text.classList.toggle('expanded');
            extraButtons.classList.toggle('show');
        });
    });
});
