// 특정 user의 즐겨찾기목록 불러오기
function loadBookmark(user_id) {

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
        var randomIndex1 = Math.floor(Math.random() * 4) + 1;
        var randomIndex2 = Math.floor(Math.random() * 6) + 1;

        $('#favorite').append(`
            <div class="box" id="randomrotate${randomIndex1}">
                    <img src="" class="background background${randomIndex2}">
                    <img src="/img/bookmark/drop.png" alt="삭제" id="drop">
                    <div class="info">
                        <table>
                            <tr>
                                <td><div id="bookmark_name">${book.menu.name}</div></td>
                            </tr>
                            <tr>
                                <td class="cocktail-con">
                                    <div id="cocktailImg" style="background-image: url('${book.menu.imgUrl}')">
                                        <div class="CII">
                                            <img src="/img/bookmark/cartIn.png" alt="담기" id="cartIn">
                                        </div>
                                    </div>
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

    });

    $(".box").hover(
        function() {
            $(this).find("#drop").css('display', 'block');
        },
        function() {
            $(this).find("#drop").css('display', 'none');
        }
    );

    $(".CI").hover(
        function() {
            $(this).find("#modify").css('display', 'block');
        },
        function() {
            $(this).find("#modify").css('display', 'none');
        }
    );

    $(".cocktail-con").hover(
        function() {
            $(this).closest('.box').find('.CII').css('display', 'block');
        },
        function() {
            $(this).closest('.box').find('.CII').css('display', 'none');
        }
    );

    $(".CII").hover(
        function() {
            $(this).css('display', 'block');
        },
        function() {
            $(this).css('display', 'none');
        }
    );

    // 이벤트 위임을 사용하여 동적으로 생성된 요소에 이벤트 핸들러를 추가합니다.
    $('#favorite').on('click', '.cartIn', function(e) {
        e.preventDefault();

        // 클릭된 요소의 부모 요소를 찾아서 해당 칵테일 이름을 가져옵니다.
        var cocktailName = $(this).closest('.box').find('.bookmark_name').text();

        alert(cocktailName);

        // 칵테일 이름에 맞는 객체를 찾아서 addToCart 함수에 전달합니다.
        addToCart(menuList.find(menu => menu.name === cocktailName));
    });

    $('#drop').click(function(){
        // alert('삭제하시겠습니까?');
    });

}


