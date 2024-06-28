

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
    var pageSize = 4; // Number of items per page
    var totalPages = Math.ceil(reviewCount / pageSize);
    var maxVisiblePages = 5;
    var paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Clear existing content

    var startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    var endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add previous (<<) button
    var prev2Button = document.createElement('span');
    prev2Button.textContent = '<<';
    prev2Button.classList.add('pagination-button');

    prev2Button.addEventListener('click', function() {
        currentPage = 1;
        renderPagination(reviewCount);
    });

    paginationContainer.appendChild(prev2Button);

    // Add previous (<) button
    var prevButton = document.createElement('span');
    prevButton.textContent = '<';
    prevButton.classList.add('pagination-button');
    if (currentPage > 1) {
        prevButton.addEventListener('click', function() {
            currentPage--;
            renderPagination(reviewCount);
        });
    } else {
        prevButton.classList.add('disabled');
    }
    paginationContainer.appendChild(prevButton);

    // Add page buttons
    for (var i = startPage; i <= endPage; i++) {
        var pageLi = document.createElement('li');
        var pageNumberSpan = document.createElement('span');
        pageNumberSpan.textContent = i;

        // Add .active class to the current page
        if (i === currentPage) {
            pageNumberSpan.classList.add('active');
        }

        // Handle page number click event
        pageNumberSpan.addEventListener('click', function() {
            var pageNumber = parseInt(this.textContent);
            currentPage = pageNumber; // Update current page

            renderPagination(reviewCount); // Re-render pagination
        });

        // Append page number to li and ul
        pageLi.appendChild(pageNumberSpan);
        paginationContainer.appendChild(pageLi);
    }

    // Add next (>) button
    var nextButton = document.createElement('span');
    nextButton.textContent = '>';
    nextButton.classList.add('pagination-button');
    if (currentPage < totalPages) {
        nextButton.addEventListener('click', function() {
            currentPage++;
            renderPagination(reviewCount);
        });
    } else {
        nextButton.classList.add('disabled');
    }
    paginationContainer.appendChild(nextButton);

    // Add next (>>) button
    var next2Button = document.createElement('span');
    next2Button.textContent = '>>';
    next2Button.classList.add('pagination-button');

    next2Button.addEventListener('click', function() {
        currentPage = totalPages;
        renderPagination(reviewCount);
    });

    paginationContainer.appendChild(next2Button);

// Handle visibility of previous (<) and next (>) buttons based on currentPage
    if (currentPage === 1) {
        prevButton.style.display = 'none';
        prev2Button.style.display = 'none';
    } else {
        prevButton.style.display = 'inline-block';
        prev2Button.style.display = 'inline-block';
    }

    if (currentPage === totalPages) {
        nextButton.style.display = 'none';
        next2Button.style.display = 'none';
    } else {
        nextButton.style.display = 'inline-block';
        next2Button.style.display = 'inline-block';
    }

    // Handle page load for the current page
    var sortOption = document.querySelector('input[name="sort"]:checked').value;
    loadReviews(currentCocktail, currentPage, sortOption);

    // Set initial active class
    var initialActivePage = paginationContainer.querySelector('li span.active');
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




