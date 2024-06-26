$(document).ready(function () {
    buildBody();

    $('#back_btn').click(function() {
        window.location.href = '/mypage/review';
    });

    $('#submit_btn').click(function (event) {
        event.preventDefault(); // 기본 제출 동작 방지

        // var itemId = $('#itemId').val();
        var itemId = item.id;
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
                alert('리뷰가 성공적으로 작성되었습니다.');
                window.location.href = '/mypage/review'; // 리뷰 목록 페이지로 리디렉션
            },
            error:
                function (error) {
                    alert('리뷰 작성에 실패했습니다.');
                }
        });
    });
});

function buildBody() {
    $('.container').empty(); // 중복을 피하기 위해 컨테이너를 비웁니다.
    const formattedDate = formatDate(item.order.regdate); // 날짜 형식 변경
    $('.container').append(`
        <div id="review-form">
            <button type="button" id="back_btn">X</button>
            <h1>리뷰 작성하기</h1>
            <span class="form-group">
                <label for="title" class="form-left">메뉴 이름</label>
                <input type="text" id="title" name="title" value="${item.menu.name}" disabled><br><br><hr>
            </span>
            <div class="form-group">
                <label for="name" class="form-left">주문 일시</label>
                <input type="text" id="name" name="name" value="${formattedDate}" disabled><br><hr>
            </div>
            <div class="form-group rating-group">
                <label for="rate" class="form-left">별점</label>
                <div class="rating" id="star_rate">
                    <input type="radio" name="rate" value="5" id="star5"><label for="star5"></label>
                    <input type="radio" name="rate" value="4" id="star4"><label for="star4"></label>
                    <input type="radio" name="rate" value="3" id="star3"><label for="star3"></label>
                    <input type="radio" name="rate" value="2" id="star2"><label for="star2"></label>
                    <input type="radio" name="rate" value="1" id="star1"><label for="star1"></label>
                </div>
            </div><hr>
            <div id="rateError" class="error"></div>
            <div class="form-group">
                <label for="content" class="form-left">리뷰 내용</label>
                <textarea id="content" name="content" rows="8" cols="80" placeholder="리뷰를 작성해주세요."></textarea>
                <div id="contentError" class="error"></div>
            </div>
            <div class="text-center">
                <button type="submit" id="submit_btn">작성 완료</button>
                <h5> * 작성하신 리뷰는 <마이페이지-나의리뷰>에서 확인하실 수 있습니다.</h5>
            </div>
        </div>
    `);
}

function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const hours = ('0' + d.getHours()).slice(-2);
    const minutes = ('0' + d.getMinutes()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
