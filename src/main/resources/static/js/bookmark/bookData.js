// 특정 user의 즐겨찾기목록 불러오기
function loadBookmark(user_id) {
    //
    // alert(user_id);
    $.ajax({
        url: "/bookmark/list/" + user_id,
        type: "GET",
        cache: false,
        success: function (data, status) {
            if (status === "success") {
                // 서버쪽 에러 메세지 있는경우
                if (data.status !== "OK") {
                    alert(data.status);
                    return;
                }
                buildBook(data);
            }
        },
    });

}

function buildBook(result){
    result.data.forEach(book => {

        $('#favorite').append(`
            <div class="box" id="randomrotate1">
                    <img src="" class="background">
                    <img src="/img/bookmark/drop.png" alt="삭제" id="drop">
                    <div class="CII">
                        <img src="/img/bookmark/cartIn.png" alt="담기" id="cartIn">
                    </div>
                    <div class="info">
                        <table>
                            <tr>
                                <td><div id="bookmark_name">${book.menu.name}</div></td>
                            </tr>
                            <tr>
                                <td id="cocktail-con">
                                    <div id="cocktailImg" style="background-image: url('${book.menu.imgUrl}')"></div>
                                </td>
                            </tr>
                            <tr>
                                <td class="CI">
                                    <p class="C1">${book.comment}</p>
                                    <div class="I">
                                        <img src="/img/bookmark/modify.png" alt="수정" id="modify">
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
        `)

    })
}