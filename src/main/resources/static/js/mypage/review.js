$(document).ready(function() {
    // 사이드바 메뉴 클릭시 css 변경
    $('.sm').eq(2).css({
        'background-color': '#FBF5ED',
        'border-radius': '10px 0 0 10px',
        'color': '#54320f',
        'font-weight': 'bold'
    });

    buildBody();

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
                    window.location.href = '/mypage/review'; // 리뷰 목록 페이지로 리디렉션
                },
                error: function(xhr, status, error) {
                    console.error('Error deleting review:', error);
                    // 실패 시 처리
                }
            });
        }
    });

    // 페이지 로드 시 최신순으로 정렬되도록 설정
    var reviewsContainer = $('.list'); // 리뷰 목록이 담긴 컨테이너
    var reviewsElements = reviewsContainer.find('.reviews-container'); // 각 리뷰 요소들

    reviewsElements.sort(function(a, b) {
        let dataparsA = new Date($(a).find('.review-date').attr('value'));
        let dataparsB = new Date($(b).find('.review-date').attr('value'));
        return dataparsB - dataparsA; // 최신순 정렬
    });

    // 정렬된 리뷰 목록을 다시 컨테이너에 추가
    reviewsElements.detach().appendTo(reviewsContainer);

    // 최신순, 별점순 라디오 버튼 클릭 시 처리
    $('input[name="sort"]').change(function() {
        var sortType = $(this).val(); // 선택된 정렬 타입 (최신순 또는 별점순)

        // 최신순으로 정렬
        if (sortType === '최신순') {
            reviewsElements.sort(function(a, b) {
                let dataparsA = new Date($(a).find('.review-date').attr('value'));
                let dataparsB = new Date($(b).find('.review-date').attr('value'));
                return dataparsB - dataparsA; // 최신순 정렬
            });
        }
        // 별점순으로 정렬
        else if (sortType === '별점순') {
            reviewsElements.sort(function(a, b) {
                var ratingA = $(a).find('.star_score').text(); // 리뷰 별점 가져오기
                var ratingB = $(b).find('.star_score').text();
                return ratingB - ratingA; // 별점순 정렬
            });
        }

        // 정렬된 리뷰 목록을 다시 컨테이너에 추가
        reviewsElements.detach().appendTo(reviewsContainer);
    });

    // 리뷰 텍스트 클릭 시 토글 애니메이션
    $(document).on('click', '.review-text', function() {
        var $reviewContent = $(this).closest('.review-content');
        var $extraButtons = $reviewContent.find('.extra-buttons');

        // 다른 review-text들의 확장 상태를 초기화하고 추가 버튼을 숨깁니다.
        $('.review-text.expanded').not(this).removeClass('expanded');

        // 현재 클릭한 review-text와 해당하는 추가 버튼의 상태를 toggle하며 애니메이션 적용
        $(this).toggleClass('expanded');
        $extraButtons.slideToggle('slow');
    });
});

function buildBody() {
    $('.container').empty(); // 중복을 피하기 위해 컨테이너를 비웁니다.
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

    $('.container').append(`
        <div class="list">
            <h2>${user.nickname}님</h2>
            <h5>REVIEW | (${reviews.length})</h5>
            <hr>
            <div class="tag_btn">
                <input type="radio" name="sort" id="latest" value="최신순" checked><label for="latest">최신순</label>
                <input type="radio" name="sort" id="rating" value="별점순"><label for="rating">별점순</label>
            </div>
            <hr>
            ${itemsHTML}
        </div>
    `);
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
