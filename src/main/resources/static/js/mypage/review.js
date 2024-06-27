$(document).ready(function() {
    initializePage(); // 페이지 로드 시 초기화 함수 호출

    // 리뷰 삭제 버튼 클릭 시
    $(document).on('click', '.btn-delete', function() {
        var $reviewContainer = $(this).closest('.reviews-container'); // 리뷰 컨테이너 jQuery 객체로 저장
        var reviewId = $reviewContainer.find('.review-id').val(); // 리뷰 ID 가져오기

        // 사용자에게 삭제 확인 창 띄우기
        if (confirm('리뷰를 삭제하시겠습니까?')) {
            // AJAX를 통해 삭제 요청 보내기
            $.ajax({
                url: '/review/deleteOk',
                type: 'POST',
                data: {
                    id: reviewId
                },
                success: function(response) {
                    // 성공 시 화면에서 리뷰 요소 삭제
                    $reviewContainer.slideUp('slow', function() {
                        $(this).remove();
                    });
                    alert('리뷰가 삭제되었습니다.');
                    // 리뷰 목록 페이지로 리디렉션
                    window.location.href = '/mypage/review';
                },
                error: function(xhr, status, error) {
                    console.error('Error deleting review:', error);
                    // 실패 시 처리
                }
            });
        }
    });

    // 최신순, 별점순 라디오 버튼 클릭 시 처리
    $('input[name="sort"]').change(function() {
        var sortType = $(this).val(); // 선택된 정렬 타입 (최신순 또는 별점순)
        sortReviews(sortType); // 리뷰 정렬 함수 호출
    });

    // 리뷰 텍스트 클릭 시 토글 애니메이션
    $(document).on('click', '.review-text', function() {
        var $reviewContent = $(this).closest('.review-content');
        var $extraButtons = $reviewContent.find('.extra-buttons');
        var $reviewText = $(this);

        // 다른 review-text들의 확장 상태를 초기화하고 추가 버튼을 숨깁니다.
        $('.review-text.expanded').not(this).removeClass('expanded').css('max-height', 'calc(5 * 1.5em)').next('.extra-buttons').slideUp('slow');

        // 현재 클릭한 review-text와 해당하는 추가 버튼의 상태를 toggle하며 애니메이션 적용
        if ($reviewText.hasClass('expanded')) {
            $reviewText.removeClass('expanded').css('max-height', 'calc(5 * 1.5em)');
            $extraButtons.slideUp('slow');
        } else {
            $reviewText.addClass('expanded').css('max-height', $reviewText[0].scrollHeight + 'px');
            $extraButtons.slideDown('slow');
        }
    });
});

function initializePage() {
    $('.container').empty(); // 리뷰 목록을 비웁니다.
    buildBody(); // 리뷰 목록을 다시 빌드합니다.
}

function buildBody() {
    let itemsHTML = "";

    reviews.forEach(review => {
        const stars = generateStars(review.rate); // Generate stars based on rating
        const formattedDate = formatDate(review.regdate); // Format the date
        itemsHTML += `
            <div class="reviews-container">
                <input type="hidden" class="review-id" value="${review.id}">
                <div class="review">
                    <img src="${review.menu.imgUrl}">
                    <div>
                        <div class="review-content">
                            <div class="review-header">
                                <p>${review.menu.name}</p>
                                <div class="review-rating">
                                    <span class="star-img">${stars}</span>
                                    <span class="star_score">${review.rate}</span>
                                </div>
                            </div>
                            <div class="review-text">${review.content}</div>
                            <div class="extra-buttons" style="display: none;">
                                <div class="review-date" value="${review.regdate}">${formattedDate}</div>
                                <button class="btn-update" onclick="location.href='/mypage/review/update/${review.id}'">수정</button>
                                <button class="btn-delete">삭제</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    let lastestInput = "";
    let ratingInput = "";
    (sort === 1) && (lastestInput = "checked");
    (sort === 2) && (ratingInput = "checked");
    $('.container').append(`
        <div class="list">
            <h2>${user.nickname}님</h2>
            <h5>REVIEW |  ${totalReviews} 개 </h5>
            <hr>
            <div class="tag_btn">
                <input type="radio" name="sort" id="latest" value="latest" ${lastestInput}>
                <label for="latest">최신순</label>
                <input type="radio" name="sort" id="rating" value="rating" ${ratingInput}>
                <label for="rating">별점순</label>
            </div>
            <hr>
            ${itemsHTML}
        </div>
    `);

    // sortReviews('최신순'); // 페이지 로드 시 최신순으로 정렬
}

function sortReviews(sortType) {

    (sortType === 'latest') && (location.href=`${url }?sort=${1}&page=${page}`);
    (sortType === 'rating') && (location.href=`${url }?sort=${2}&page=${page}`);

    // var reviewsContainer = $('.list'); // 리뷰 목록이 담긴 컨테이너
    // var reviewsElements = reviewsContainer.find('.reviews-container'); // 각 리뷰 요소들
    //
    // reviewsElements.detach(); // 기존 리뷰 요소들을 제거합니다.
    //
    // reviewsElements.sort(function(a, b) {
    //     if (sortType === 'latest') {
    //         let dateA = new Date($(a).find('.review-date').attr('value'));
    //         let dateB = new Date($(b).find('.review-date').attr('value'));
    //         return dateB - dateA; // 최신순 정렬
    //     } else if (sortType === 'rating') {
    //         var ratingA = $(a).find('.star_score').text(); // 리뷰 별점 가져오기
    //         var ratingB = $(b).find('.star_score').text();
    //         return ratingB - ratingA; // 별점순 정렬
    //     }
    // });
    //
    // reviewsElements.appendTo(reviewsContainer); // 정렬된 요소들을 다시 추가합니다.
}

function generateStars(score) {
    const starImgFull = '<img src="/img/review/yellow_star.png" class="star-img">';
    const starImgEmpty = '<img src="/img/review/grey_star.png" class="star-img">';
    const fullStars = starImgFull.repeat(score);
    const emptyStars = starImgEmpty.repeat(5 - score);
    return fullStars + emptyStars;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('input[name="sort"]').forEach((radio) => {
        radio.addEventListener('change', (event) => {
            const sortType = event.target.value;
            window.location.href = `/review/list?sortType=${sortType}`;
        });
    });
});