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

$(document).ready(function() {

    // 사이드바 메뉴 클릭시 css 변경 => 가연 추가!
    $('.sm').eq(2).css({
        'background-color':'#FBF5ED',
        'border-radius' : "10px 0 0 10px",
        'color' : '#54320f',
        'font-weight': 'bold'
    });

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