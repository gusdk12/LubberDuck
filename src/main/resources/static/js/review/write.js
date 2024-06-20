$(document).ready(function () {
    buildBody();
})

function buildBody() {
    $('.container').empty(); // 중복을 피하기 위해 컨테이너를 비웁니다.
    reviewList.forEach(reviewList => {
    $('.container').append(`
<form id="consultation-form" th:action="@{/review/write}" method="post">
    <h1>리뷰 작성하기</h1>
    <span class="form-group">
                    <label for="title" class="form-left">메뉴 이름</label>
                    <input type="text" id="title" name="title" value="${reviewList.menu.name}"><br><br><hr>
                </span>
    <div class="form-group">
        <label for="name" class="form-left">주문 일시</label>
        <input type="text" id="name" name="name" disabled><br><hr>
    </div>


    <div class="form-group rating-group">
        <label for="star5" class="form-left">별점</label>
        <div class="rating" id="star_rate">
            <input type="radio" name="starscore" value="5" id="star5"><label for="star5"></label>
                <input type="radio" name="starscore" value="4" id="star4"><label for="star4"></label>
                    <input type="radio" name="starscore" value="3" id="star3"><label for="star3"></label>
                        <input type="radio" name="starscore" value="2" id="star2"><label for="star2"></label>
                            <input type="radio" name="starscore" value="1" id="star1"><label for="star1"></label>
        </div>
    </div>
    <hr>

        <div class="form-group">
            <label for="content" class="form-left">내용</label>
            <textarea name="content" id="content" cols="30" rows="10" required value="잇뇽"></textarea>
        </div>

        <button type="submit" id="submit_btn">작성완료</button>
</form>`
    )})}


