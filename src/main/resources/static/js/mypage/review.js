$(document).ready(function() {
    initializePage(); // 페이지 로드 시 초기화 함수 호출

    // 모달 추가
    $('body').append(`
        <div id="reviewModal" class="modal" style="position: absolute; display: none;">
            <div class="modal-content">
                <div id="modalContent"></div>
            </div>
        </div>
    `);

    // 모달 닫기 버튼 클릭 시
    $(document).on('click', '.close-button', function() {
        $('#reviewModal').hide();
    });

    // 리뷰 수정 버튼 클릭 시
    $(document).on('click', '.btn-update', function() {
        const reviewId = $(this).data('review-id');
        const reviewContent = $(this).data('review-content');
        const reviewRegdate = $(this).data('review-regdate');
        const reviewRate = $(this).data('review-rate');
        const reviewMenuName = $(this).data('review-menu-name');

        const modalContent = `
            <div id="review-form">
                <span class="close-button">&times;</span>
                <h3>리뷰 수정하기</h3>
                <span class="form-group">
                    <label for="menuName" class="form-left">메뉴 이름</label>
                    <input type="text" id="menuNameUpdate" name="menuName" value="${reviewMenuName}" disabled><br><br><hr>
                </span>
                <div class="form-group">
                    <label for="orderDate" class="form-left">주문 일시</label>
                    <input type="text" id="orderDateUpdate" name="orderDate" value="${formatDateTime(reviewRegdate)}" disabled><br><hr>
                </div>
                <div class="form-group rating-group">
                    <label class="form-left">별점</label>
                    <div class="rating" id="star_rate">
                        <input type="radio" name="rate" value="5" id="star5" ${reviewRate == 5 ? 'checked' : ''}><label for="star5"></label>
                        <input type="radio" name="rate" value="4" id="star4" ${reviewRate == 4 ? 'checked' : ''}><label for="star4"></label>
                        <input type="radio" name="rate" value="3" id="star3" ${reviewRate == 3 ? 'checked' : ''}><label for="star3"></label>
                        <input type="radio" name="rate" value="2" id="star2" ${reviewRate == 2 ? 'checked' : ''}><label for="star2"></label>
                        <input type="radio" name="rate" value="1" id="star1" ${reviewRate == 1 ? 'checked' : ''}><label for="star1"></label>
                    </div>
                </div>
                <hr>
                <div id="rateError" class="error"></div>
                <div class="form-group">
                    <label for="reviewContent" class="form-left">리뷰 내용</label>
                    <textarea id="reviewContentUpdate" name="reviewContent" rows="8" cols="80">${reviewContent}</textarea>
                    <div id="contentError" class="error"></div>
                </div>
                <div class="text-center">
                    <button type="button" id="submit_btn" data-review-id="${reviewId}">작성 완료</button>
                    <h5> * 작성하신 리뷰는 <마이페이지-나의리뷰>에서 확인하실 수 있습니다.</h5>
                </div>
            </div>
        `;

        $('#modalContent').html(modalContent);
        positionModal('#reviewModal', $(this)); // 모달 위치 조정 함수 호출
        $('#reviewModal').show();
    });

    // 리뷰 수정 완료 버튼 클릭 시
    $(document).on('click', '#submit_btn', function(event) {
        event.preventDefault(); // 기본 제출 동작 방지

        const reviewId = $(this).data('review-id'); // 리뷰 ID 가져오기
        const selectedRating = $('input[name="rate"]:checked').val(); // 선택된 별점 값 가져오기
        const content = $('#reviewContentUpdate').val(); // 리뷰 내용 가져오기

        // 기존 오류 메시지 제거
        $('.error').text('');

        let isValid = true;

        // 별점이 선택되지 않은 경우 에러 메시지 출력
        if (!selectedRating) {
            $('#rateError').text('별점을 선택해주세요.');
            $('#rateError').show();
            isValid = false;
        }

        // 리뷰 내용이 20자 미만인 경우 에러 메시지 출력
        if (content.length < 20) {
            $('#contentError').text('리뷰 내용을 20자 이상 작성해주세요.');
            $('#contentError').show();
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        $.ajax({
            url: '/review/modify',
            type: 'POST',
            data: {
                id: reviewId,
                rate: selectedRating,
                comment: content
            },
            cache: false,
            success: function(response) {
                swal('수정 성공!', '리뷰 목록에서 수정된 리뷰를 확인해보세요!', 'success')
                    .then(function() {
                        window.location.href = '/mypage/review'; // 리뷰 목록 페이지로 리디렉션
                    });
            },
            error: function(error) {
                swal('수정 실패!', '다시 시도해주세요.', 'warning');
            }
        });

        // 모달 닫기
        $('#reviewModal').hide();
    });

    // 리뷰 삭제 버튼 클릭 시
    $(document).on('click', '.btn-delete', function() {
        const reviewId = $(this).data('review-id'); // 리뷰 ID 가져오기
        const $reviewContainer = $(this).closest('.reviews-container'); // 리뷰 컨테이너 jQuery 객체로 저장

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
                    swal('삭제 성공!', '리뷰가 정상적으로 삭제되었습니다.', 'success')
                        .then(function() {
                            window.location.href = '/mypage/review'; // 리뷰 목록 페이지로 리디렉션
                        });
                },
                error: function(xhr, status, error) {
                    console.error('Error deleting review:', error);
                    // 실패 시 처리
                }
            });

            // 모달 닫기
            $('#reviewModal').hide();
        }
    });

    // 최신순, 별점순 라디오 버튼 클릭 시 처리
    $('input[name="sort"]').change(function() {
        const sortType = $(this).val(); // 선택된 정렬 타입 (최신순 또는 별점순)
        sortReviews(sortType); // 리뷰 정렬 함수 호출
    });
});

function initializePage() {
    $('.container').empty(); // 리뷰 목록을 비웁니다.

    buildBody(); // 리뷰 목록을 다시 빌드합니다.
}

function buildBody() {
    let itemsHTML = '';

    $('.container').empty();
    if (!reviews) {
        // 리뷰가 없는 경우
        $('.container').append(`
            <div class="no-reviews">
                <img id="icon" src="/img/mypage/order-icon.png">
                <p>리뷰 목록이 없습니다.</p>
                <a href="/home">홈으로 가기</a>
            </div>
        `);
        return;
    }

    reviews.forEach(review => {
        const stars = generateStars(review.rate); // 평점에 따른 별점 생성
        const formattedDate = formatDate(review.regdate); // 날짜 형식화

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
                            <div class="review-text" data-review-id="${review.id}" data-review-content="${review.content}" data-review-regdate="${review.regdate}" data-review-rate="${review.rate}" data-review-menu-name="${review.menu.name}">
                                ${review.content}
                            </div>
                            <div class="review-date">${formattedDate}</div>
                            <div class="text-center">
                                <button type="button" class="btn-update" data-review-id="${review.id}" data-review-rate="${review.rate}" data-review-content="${review.content}" data-review-menu-name="${review.menu.name}" data-review-regdate="${review.regdate}">수정</button>
                                <button type="button" class="btn-delete" data-review-id="${review.id}">삭제</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    let latestInput = '';
    let ratingInput = '';
    if (sort === 1) {
        latestInput = 'checked';
    } else if (sort === 2) {
        ratingInput = 'checked';
    }

    $('.container').append(`
        <div class="list">
            <h2>${user.nickname}님</h2>
            <h5>REVIEW | ${totalReviews} 개 </h5>
            <hr>
            <div class="tag_btn">
                <input type="radio" name="sort" id="latest" value="latest" ${latestInput}>
                <label for="latest">최신순</label>
                <input type="radio" name="sort" id="rating" value="rating" ${ratingInput}>
                <label for="rating">별점순</label>
            </div>
            <hr>
            ${itemsHTML}
        </div>
    `);
}

function sortReviews(sortType) {
    if (sortType === 'latest') {
        location.href = `${url}?sort=${1}&page=${page}`;
    } else if (sortType === 'rating') {
        location.href = `${url}?sort=${2}&page=${page}`;
    }
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

function formatDateTime(dateString) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
}

function positionModal(modalId, button) {
    const modal = $(modalId);
    const buttonOffset = button.offset();
    const modalWidth = modal.outerWidth();
    const modalHeight = modal.outerHeight();
    const topMargin = 20; // 모달 상단 여백

    const modalLeft = buttonOffset.left + button.outerWidth() + 100;
    const modalTop = buttonOffset.top - modalHeight / 2;

    modal.css({
        'top': modalTop + 'px',
        'left': modalLeft + 'px',
        'position': 'absolute'
    });
}