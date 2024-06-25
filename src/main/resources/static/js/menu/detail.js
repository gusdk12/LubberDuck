
$(document).ready(function() {
    loadRecent(logged_id);
});

window.addEventListener('load', () => {

    loadMenu();
    addEvent();
    reviewsList();

});

window.addEventListener('popstate', function (event) {
    // This code runs when the back button is clicked
    alert('popstate event triggered');
    location.reload(); // Refresh the page
});

async function loadMenu() {
    $('#img').css({'background-image': `url('${menu.imgUrl}')`});
    document.querySelector(`#name`).textContent = `${menu.name}`;
    document.querySelector(`#info`).textContent = `${menu.info}`;
    document.querySelector(`#price`).textContent = `${menu.price} ￦`;
    // var cocktailName = `${menu.name}`;

    // 로그인 상태일때만 불러오기
    if (logged_id !== -1) {
        const isBookmarked = await checkBook(menu);

        // 즐겨찾기 존재여부에 따른 클래스 설정
        isBookmarked && switchToFullHeart(); // 참
        isBookmarked || switchToEmptyHeart(); // 거짓
    }
}

function addEvent(){

    // Hide the comment-con when clicking outside of it
    $(document).click(function(event) {
        if (!$(event.target).closest('.comment-con').length && !$(event.target).closest('#heartImg').length) {
            $('.comment-con').css('display', 'none');
        }
    });

    // addToCart
    $('#toCart').click(function(){
        var cocktailName = $(this).parent().siblings("#name").text();
        addToCart(menuList.find(menu => menu.name === cocktailName));
    });

   // swtichHeartIcon
    $('#heart').click(function(event) {
        if(event.target.className === "fullHeart"){
            event.stopPropagation();
            var cocktailName = $(this).closest('#cocktailsection').find('#name').text();
            deleteFromBook(menuList.find(menu => menu.name === cocktailName));
            swal("DELETE",cocktailName+'가 즐겨찾기에서 삭제되었습니다.',"success");

            switchToEmptyHeart();
        } else if(event.target.className === "emptyHeart"){
            event.stopPropagation();
            openComment();
            $("#heart").css('display','none');
        }
    });

    // addToBook
    $('#commentCheck').click(function() {
        var cocktailName = $(this).closest('#cocktailsection').find('#name').text();
        var commentValue = $(this).closest('#cocktailsection').find('.comment').val();
        var errorMessage = $(this).closest('#cocktailsection').find('.comment-error-message');

        // 글자 수 체크
        var maxLength = 30;
        if (commentValue.length > maxLength) {
            var currentLength = commentValue.length;
            var message = '코멘트는 30자까지 작성 가능합니다. (현재 ' + currentLength + '글자)';
            errorMessage.text(message);
            errorMessage.css('display','block');
            return; // 글자 수가 넘어가면 함수 종료
        } else {
            errorMessage.css('display', 'none');
        }

        addToBook(menuList.find(menu => menu.name === cocktailName), commentValue);
        swal("SUCCESS", "즐겨찾기에 추가되었습니다", "success");
        $("#heart").css('display', 'block');

        switchToFullHeart();
        closeComment();
    });
}

function switchToFullHeart() {
    $('#container').find('#heart').removeClass('emptyHeart').removeClass('fullHeart').addClass('fullHeart');
}

function switchToEmptyHeart() {
    $('#container').find('#heart').removeClass('emptyHeart').removeClass('fullHeart').addClass('emptyHeart');
}

// 코멘트창 열기
function openComment() {
    $('.comment-con').css('display', 'block');
    $('.comment').css('height', '200px');
}

// 코멘트창 닫기
function closeComment() {
    $('#container').find(".comment").val('');
    $('.comment-con').css('display', 'none');
    $('.comment').css('height', '0px');
}


//다혜
document.addEventListener('DOMContentLoaded', function () {
    const reviewTexts = document.querySelectorAll('.review-text');

    reviewTexts.forEach(text => {
        text.addEventListener('click', () => {
            const reviewContent = text.parentElement;

            // 다른 review-text들의 확장 상태를 초기화하고 추가 버튼을 숨깁니다.
            reviewTexts.forEach(otherText => {
                if (otherText !== text) {
                    otherText.classList.remove('expanded');
                }
            });

            // 현재 클릭한 review-text와 해당하는 추가 버튼의 상태를 toggle합니다.
            text.classList.toggle('expanded');
            extraButtons.classList.toggle('show');
        });
    });

});

$(document).ready(function () {
    // 페이지 로드 시 최신순으로 정렬되도록 설정
    var reviewsContainer = $('.list'); // 리뷰 목록이 담긴 컨테이너
    var reviews = reviewsContainer.find('.reviews-container'); // 각 리뷰 요소들

    reviews.sort(function (a, b) {
        var dateA = $(a).find('.review-regdate').text(); // 리뷰 날짜 가져오기
        var dateB = $(b).find('.review-regdate').text();
        return new Date(dateB) - new Date(dateA); // 최신순 정렬
    });

    // 정렬된 리뷰 목록을 다시 컨테이너에 추가
    reviews.detach().appendTo(reviewsContainer);

    // 최신순, 별점순 라디오 버튼 클릭 시 처리
    $('input[name="sort"]').change(function () {
        var sortType = $(this).val(); // 선택된 정렬 타입 (최신순 또는 별점순)

        // 최신순으로 정렬
        if (sortType === '최신순') {
            reviews.sort(function (a, b) {
                var dateA = $(a).find('.review-regdate').text(); // 리뷰 날짜 가져오기
                var dateB = $(b).find('.review-regdate').text();
                return new Date(dateB) - new Date(dateA); // 최신순 정렬
            });
        }
        // 별점순으로 정렬
        else if (sortType === '별점순') {
            reviews.sort(function (a, b) {
                var ratingA = $(a).find('.star_score').text(); // 리뷰 별점 가져오기
                var ratingB = $(b).find('.star_score').text();
                return ratingB - ratingA; // 별점순 정렬
            });
        }

        // 정렬된 리뷰 목록을 다시 컨테이너에 추가
        reviews.detach().appendTo(reviewsContainer);
    });

});

function reviewsList() {

// reviews-container 내부의 각 리뷰 div에 데이터 할당
    var reviewsContainer = document.querySelector('.reviews-container');

    reviews.forEach(function (review) {
        // 리뷰 요소 생성
        var reviewElement = document.createElement('div');
        reviewElement.classList.add('review');

        // 리뷰 내용 구성
        reviewElement.innerHTML = `
        <div class="review-content">
            <div class="review-header">
                <div class="review-title">
                    <span class="star">${review.rate}</span>
                    <span class="star_score">${review.rate}</span>
                    <h6 id="review_name">${review.user.nickname}</h6>
                </div>
                <span class="review-regdate">${review.regdate}</span>
            </div>
            <div class="review-text">${review.content}</div>
            <hr class="review_hr">
        </div>

    `;

        // reviewsContainer에 리뷰 요소 추가
        reviewsContainer.appendChild(reviewElement);
    });
}

