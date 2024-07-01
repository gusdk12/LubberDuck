// 페이지네이션
function renderPagination(reviewCount, currentPage, sortType) {
    var paginationContainer = document.getElementById('pagination');
    var reviewsContainer = document.querySelector('.reviews-container');

    // 리뷰가 없는 경우
    if (!reviewCount || reviewCount === 0) {
        reviewsContainer.innerHTML = '<p id="review_null">아직 작성된 리뷰가 없습니다</p>';
        paginationContainer.innerHTML = ''; // 페이지네이션 비우기
        return;
    }

    var pageSize = 4;
    var totalPages = Math.ceil(reviewCount / pageSize);
    var maxVisiblePages = 5;
    // var paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    var startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    var endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 버튼을 감싸는 div 추가 함수
    function addButton(text, handler, isDisabled) {
        var buttonContainer = document.createElement('div');
        var button = document.createElement('span');
        button.textContent = text;
        button.classList.add('pagination-button');
        if (isDisabled) button.classList.add('disabled');
        button.addEventListener('click', handler);
        buttonContainer.appendChild(button);
        paginationContainer.appendChild(buttonContainer);
    }

    // 이전 (<<) 버튼 추가
    addButton('<<', function() {
        if (currentPage !== 1) {
            currentPage = 1;
            renderPagination(reviewCount, currentPage, sortType);
        }
    }, currentPage === 1);

    // 이전 (<) 버튼 추가
    addButton('<', function() {
        if (currentPage > 1) {
            currentPage--;
            renderPagination(reviewCount, currentPage, sortType);
        }
    }, currentPage === 1);

    // 페이지 번호 버튼 추가
    for (var i = startPage; i <= endPage; i++) {
        var pageDiv = document.createElement('div');
        var pageNumberSpan = document.createElement('span');
        pageNumberSpan.textContent = i;
        if (i === currentPage) {
            pageNumberSpan.classList.add('active');
        }
        pageNumberSpan.addEventListener('click', function() {
            var pageNumber = parseInt(this.textContent);
            currentPage = pageNumber;
            renderPagination(reviewCount, currentPage, sortType);
        });
        pageDiv.appendChild(pageNumberSpan);
        paginationContainer.appendChild(pageDiv);
    }

    // 다음 (>) 버튼 추가
    addButton('>', function() {
        if (currentPage < totalPages) {
            currentPage++;
            renderPagination(reviewCount, currentPage, sortType);
        }
    }, currentPage === totalPages);

    // 다음 (>>) 버튼 추가
    addButton('>>', function() {
        if (currentPage !== totalPages) {
            currentPage = totalPages;
            renderPagination(reviewCount, currentPage, sortType);
        }
    }, currentPage === totalPages);

    // 현재 페이지에 대한 로드 처리
    loadReviews(currentCocktail, currentPage, sortType);

    // 초기 활성 클래스 설정
    var initialActivePage = paginationContainer.querySelector('div span.active');
    if (initialActivePage) {
        initialActivePage.classList.add('active');
    }

    // 라디오 버튼 변경 시 이벤트 핸들러 등록
    document.querySelectorAll('input[name="sort"]').forEach((elem) => {
        elem.removeEventListener('change', sortChangeHandler); // 기존 이벤트 핸들러 제거
        elem.addEventListener('change', sortChangeHandler); // 새로운 이벤트 핸들러 등록
    });

    // 정렬 옵션 변경 시 처리하는 함수
    function sortChangeHandler() {
        var newSortType = this.value;
        renderPagination(reviewCount, 1, newSortType); // 첫 페이지로 이동하여 다시 렌더링
    }
}

function loadReviews(cocktail, page, sort) {
    $.ajax({
        url: "/review/list/" + cocktail.id + "/" + page + "/" + sort,
        type: "GET",
        cache: false,
        success: function (data, status) {
            if (status === "success") {
                // 서버쪽 에러 메세지 있는경우
                if (data.status !== "OK") {
                    // alert(data.status);
                    return;
                }

                // 리뷰 데이터를 UI에 반영하는 함수 호출
                buildReviewSection(data.data);
            }
        },
        error: function(error) {
            console.error('Error fetching reviews:', error);
        }
    });
}


// 리뷰 목록 생성 (buildReviewSection)
function buildReviewSection(reviews){

    // 리뷰 목록을 HTML에 렌더링합니다.
    var reviewsContainer = document.querySelector('.reviews-container');
    reviewsContainer.innerHTML = ''; // 기존 리뷰를 비웁니다.

    reviews.forEach(function (review) {
        var reviewElement = document.createElement('div');
        reviewElement.classList.add('review');

        // 리뷰 내용 구성
        reviewElement.innerHTML = `
            <div class="review-content">
                <div class="review-header">
                    <div class="review-title">
                        <span class="star-img">${generateStars(review.rate)}</span>
                        <span class="star_score">${review.rate}</span>
                        <h6 id="review_name">${review.user.nickname}</h6>
                    </div>
                    <span class="review-regdate">${formatDate(review.regdate)}</span>
                </div>
                <div class="review-text">${review.content}</div>
                <hr class="review_hr">
            </div>
        `;

        reviewsContainer.appendChild(reviewElement);
    });


    // 별점 이미지를 생성합니다.
    function generateStars(score) {
        var starImgFull = '<img src="/img/review/yellow_star.png" class="star-img">';
        var starImgEmpty = '<img src="/img/review/grey_star.png" class="star-img">';
        var fullStars = starImgFull.repeat(score);
        var emptyStars = starImgEmpty.repeat(5 - score);
        return fullStars + emptyStars;
    }
}


