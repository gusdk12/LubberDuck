$(document).ready(function () {
    buildBody();

    $('#back_button').click(function () {
        history.back();
    });

    $('#back_btn').click(function () {
        history.back();
    });
});

function buildBody() {
    $('.container').empty(); // 중복을 피하기 위해 컨테이너를 비웁니다.
    const formattedDate = formatDate(review.order.regdate); // 날짜 형식 변경
    $('.container').append(`
        <div id="review-form">
            <button type="button" id="back_btn">X</button>
            <h1>리뷰 상세보기</h1>
            <span class="form-group">
                <label for="title" class="form-left">메뉴 이름</label>
                <input type="text" id="title" name="title" value="${review.menu.name}" disabled><br><br><hr>
            </span>
            <div class="form-group">
                <label for="name" class="form-left">주문 일시</label>
                <input type="text" id="name" name="name" value="${formattedDate}" disabled><br><hr>
            </div>
            <div class="form-group rating-group">
                <label for="rate" class="form-left">별점</label>
                      <div class="rating" id="star_rate">
                    <input type="radio" name="rate" value="5" id="star5" ${review.rate == 5 ? 'checked' : ''} disabled><label for="star5"></label>
                    <input type="radio" name="rate" value="4" id="star4" ${review.rate == 4 ? 'checked' : ''} disabled><label for="star4"></label>
                    <input type="radio" name="rate" value="3" id="star3" ${review.rate == 3 ? 'checked' : ''} disabled><label for="star3"></label>
                    <input type="radio" name="rate" value="2" id="star2" ${review.rate == 2 ? 'checked' : ''} disabled><label for="star2"></label>
                    <input type="radio" name="rate" value="1" id="star1" ${review.rate == 1 ? 'checked' : ''} disabled><label for="star1"></label>
                </div>
            </div>
            <hr>
            <div id="rateError" class="error"></div>
            <div class="form-group">
                <label for="content" class="form-left">리뷰 내용</label>
                <textarea id="content" name="content" rows="8" cols="80" readonly>${review.content}</textarea>
                <div id="contentError" class="error"></div>
            </div>
            <div class="text-center">
                <button type="button" id="back_button">돌아가기</button>
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
