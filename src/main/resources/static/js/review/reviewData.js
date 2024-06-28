

function buildReviewSection(reviews){
    //     // 예제 데이터로 임시 리뷰 목록 설정
    console.log(reviews);
    reviewsData = reviews;

    // 최신순으로 초기에 정렬하여 렌더링
    renderReviews(reviewsData);


    // 리뷰 목록을 HTML에 렌더링합니다.
    function renderReviews(reviews) {
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
    }

    // 별점 이미지를 생성합니다.
    function generateStars(score) {
        var starImgFull = '<img src="/img/review/yellow_star.png" class="star-img">';
        var starImgEmpty = '<img src="/img/review/grey_star.png" class="star-img">';
        var fullStars = starImgFull.repeat(score);
        var emptyStars = starImgEmpty.repeat(5 - score);
        return fullStars + emptyStars;
    }

    // 라디오 버튼 변경 시 리뷰를 다시 정렬하여 렌더링
    $('input[name="sort"]').change(function () {
        var sortType = $(this).val();
        var sortedReviews = sortReviews(reviewsData, sortType);
        renderReviews(sortedReviews);
    });
}

function renderPagination(reviewCount) {
    var pageSize = 4; // 한 페이지에 보여질 아이템 수
    var totalPages = Math.ceil(reviewCount / pageSize);
    var maxVisiblePages = 5;

    var paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // 기존의 내용을 모두 지움

    // 최소한의 버튼 수를 정하는 경우
    var startPage = Math.max(1, currentPage - 2);
    var endPage = Math.min(totalPages, currentPage + 2);


    // 페이지 버튼 추가
    for (var i = 1; i <= totalPages; i++) {
        var pageLi = document.createElement('li');
        var pageNumberSpan = document.createElement('span');
        pageNumberSpan.textContent = i;

        // 현재 페이지인 경우 .active 클래스 추가
        if (i === currentPage) {
            pageNumberSpan.classList.add('active');
        }

        // 페이지 번호 클릭 시 이벤트 처리
        pageNumberSpan.addEventListener('click', function() {
            var pageNumber = parseInt(this.textContent);
            currentPage = pageNumber; // 현재 페이지 업데이트

            // 모든 페이지 번호의 활성 클래스 제거
            var allPageNumbers = paginationContainer.querySelectorAll('li span');
            allPageNumbers.forEach(function(span) {
                span.classList.remove('active');
            });

            // 클릭된 페이지 번호에 활성 클래스 추가
            this.classList.add('active');

            // 페이지 이동 함수 호출
            changePage(currentPage);
        });

        // 페이지 번호를 li에 추가하고 ul에 추가
        pageLi.appendChild(pageNumberSpan);
        paginationContainer.appendChild(pageLi);
    }

    // 페이지 로드 후 첫 페이지 리뷰를 로드
    var sortOption = document.querySelector('input[name="sort"]:checked').value;
    loadReviews(currentCocktail, currentPage, sortOption);

    // 초기 페이지의 활성 클래스 설정
    var initialActivePage = paginationContainer.querySelector('li:first-child span');
    if (initialActivePage) {
        initialActivePage.classList.add('active');
    }
}



function changePage(pageNumber) {
    // 현재 페이지 번호 업데이트
    currentPage = pageNumber;
    var sortOption = document.querySelector('input[name="sort"]:checked').value;

    document.querySelectorAll('input[name="sort"]').forEach((elem) => {
        elem.addEventListener('change', function() {
            sortOption = this.value;
            changePage(1); // 정렬 기준 변경 시 첫 페이지로 이동
        });
    });


    function ceilDivideBy4(reviewCount) {
        return Math.ceil(reviewCount / 4);
    }

    var paginationContainer = document.getElementById('pagination');
    var allPageNumbers = paginationContainer.querySelectorAll('li span');

    // 모든 페이지 번호의 활성 클래스 제거
    allPageNumbers.forEach(function(span) {
        span.classList.remove('active');
    });

    // 클릭된 페이지 번호에 활성 클래스 추가
    var currentPageSpan = paginationContainer.querySelector('li:nth-child(' + currentPage + ') span');
    if (currentPageSpan) {
        currentPageSpan.classList.add('active');
    }

    var reviewPrev = $('#reviewPrev');
    var reviewNext = $('#reviewNext');
    var reviewPrev2 = $('#reviewPrev2');
    var reviewNext2 = $('#reviewNext2');

    // currentPage에 따라 CSS 조절
    if (currentPage > 1) {
        reviewPrev.css('display', 'block'); // 이전 버튼 보이기
        reviewPrev2.css('display', 'block');
    } else {
        reviewPrev.css('display', 'none'); // 이전 버튼 숨기기
        reviewPrev2.css('display', 'none');
    }

    if (currentPage < (parseInt(ceilDivideBy4(reviewCount)))) {
        reviewNext.css('display', 'block'); // 다음 버튼 보이기
        reviewNext2.css('display', 'block');
    }else {
        reviewNext.css('display', 'none'); // 다음 버튼 숨기기
        reviewNext2.css('display', 'none');
    }

    // 해당 페이지의 리뷰를 로드
    loadReviews(currentCocktail, currentPage, sortOption);
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




