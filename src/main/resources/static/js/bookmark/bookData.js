
// 즐겨찾기에 존재하는지 확인하고 그에맞는 css
async function checkBook(cocktail){
    let findBook = null;

    try {
        const response = await $.ajax({
            url: "/bookmark/detail/" + logged_id + "/" + cocktail.id,
            type: "GET",
            cache: false
        });

        if (response.status !== "OK") {
            alert(response.status);
            return false;
        }
        findBook = response.data;
    } catch (error) {
        console.error("Error fetching bookmark details:", error);
        return false;
    }
    return !!findBook;
}

// 추가하기
async function addToBook(cocktail, comment){

    // 전달할 parameter 준비 (POST)
    const data = {
        "userId" : logged_id,
        "cocktailId" : cocktail.id,
        "comment" : comment,
    };

    $.ajax({
        url:"/bookmark/add",
        type: "POST",
        data: data,
        cache: false,
        success: function(data, status){
            if(status === "success"){
                if(data.status !== "OK"){
                    alert(data.status);
                    return;
                }
                loadBookmark(logged_id);
            }
        },
    });
}

// 수정하기
async function updateFromBook(cocktail, comment) {

   // 전달할 parameter 준비 (POST)
    const data = {
        "userId" : logged_id,
        "cocktailId" : cocktail.id,
        "comment" : comment,
    };

    $.ajax({
        url: `/bookmark/update/${logged_id}/${cocktail.id}`,
        type: "POST",
        data: data,
        cache: false,
        success: function(data, status) {
            if (status === "success") {
                if (data.status === "OK") {
                    // 업데이트 성공 시 화면에서 바로 코멘트 업데이트
                    $(`#favorite .cocktail_name:contains("${cocktail.name}")`)
                        .siblings('.CI').find('.C1').text(comment);
                    swal("SUCCESS","코멘트 수정 완료","success");

                } else {
                    alert(data.status);
                }
            } else {
                swal("WARNING","코멘트 수정 실패","warning");
            }
        },
        error: function(xhr, status, error) {
            console.error("Error updating comment:", error);
            alert("Failed to update comment.");
        }
    });
}

// 삭제하기
async function deleteFromBook(cocktail){
    $.ajax({
        url: "/bookmark/delete/" + logged_id + "/" + cocktail.id,
        type: "POST",
        cache: false,
        success: function(data, status){
            if(status === "success"){
                if(data.status !== "OK"){
                    alert(cocktail.id);
                    alert(data.status);
                }
            }
        },
    });
}

// 특정 user의 즐겨찾기목록 불러오기
function loadBookmark(user_id) {
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
    var $favorite = $('#favorite');

    $favorite.empty();

    if (result.data.length === 0) {
        $('#favorite').append(`
            <img src="/img/bookmark/fullheart.png" id="bigHeart1"/>
            <img src="/img/bookmark/fullheart.png" id="bigHeart2"/>
            <div class="bookEmpty"> 
                아직 즐겨찾기한 칵테일이 존재하지 않습니다. <br> 
                칵테일을 <a href="/home" class="add-link">추가</a> 해보세요!
            </div>`);
        $('.all').css('height','700px');
    } else {
        $('.all').css('height','1000px');
        result.data.forEach(book => {
            var randomIndex1 = Math.floor(Math.random() * 4) + 1;
            var randomIndex2 = Math.floor(Math.random() * 6) + 1;

            // box 요소를 append
            var $box = $(`
            <div class="box" id="randomrotate${randomIndex1}">
                <div class="background background${randomIndex2}">
                    <img src="" id="memoImg">
                    <div class="drop">
                        <img src="/img/bookmark/drop.png" alt="삭제">
                    </div>
                </div>

                <div class="info">
                    <div class="cocktail_name">${book.menu.name}</div>
                    <div class="cocktail-con">
                        <div id="cocktailImg" style="background-image: url('${book.menu.imgUrl}')"></div>
                        <div class="CII">
                            <div id="cartYesNo" class="cartIn cartNo"></div>
                        </div>
                    </div>
                    <div class="CI">
                        <p class="C1"> ${book.comment}</p>
                        <div class="I">
                            <img src="/img/bookmark/modify.png" alt="수정" id="modify">
                        </div>
                        
                        <div class="comment-con">
                            <textarea class="modifyBox"> ${book.comment} </textarea>
                            <img src="/img/bookmark/check.png" id="commentCheck">
                            <div class="error-message">코멘트는 최대 30글자입니다.</div>
                        </div>
                    </div>
                </div>
            </div>
        `);

            // book.menu.sequence == -1 -> 판매 X
            var checkItem = book.menu.sequence;

            // menuList에 존재하는 경우 즉 sequence가 -1이 아니면 switchToCartIn 적용, 아닌 경우 switchToCartNo 적용
            if (checkItem !== -1) {
                switchToCartIn($box);
            } else {
                switchToCartNo($box);
            }

            // #favorite 요소에 $box 추가
            $('#favorite').append($box);

            function switchToCartIn(){
                $box.find('#cartYesNo').removeClass('cartIn cartNo').addClass('cartIn');
            }

            function switchToCartNo() {
                $box.find('#cartYesNo').removeClass('cartIn cartNo').addClass('cartNo');
            }
        });
    }



    // 박스 hover 시 삭제 아이콘 등장
    $(".box").hover(
        function() {
            $(this).find(".drop").css('display', 'block');
        },
        function() {
            $(this).find(".drop").css('display', 'none');
        }
    );

    // 칵테일 이미지 hover 시 담기/판매종료 아이콘 등장
    $(".cocktail-con").hover(
        function() {
            $(this).closest('.box').find('.CII').css('display', 'block');
        },
        function() {
            $(this).closest('.box').find('.CII').css('display', 'none');
        }
    );

    // 댓글창에 hover 시 수정 아이콘 등장
    $(".CI").hover(
        function() {
            $(this).find(".I").css('display', 'block');
        },
        function() {
            $(this).find(".I").css('display', 'none');
        }
    );

    // 이벤트 위임을 사용하여 동적으로 생성된 #modify 요소에 이벤트 핸들러를 추가합니다.
    $('#favorite').on('click', '#modify', function(e) {
        e.stopPropagation(); // 이벤트 전파를 중지하여 document 클릭 이벤트가 바로 발생하지 않도록 함
        $(this).closest('.box').find('.C1').css('display', 'none');
        $(this).closest('.box').find('.comment-con').css('display', 'block');
    });

    // 문서 전체에 클릭 이벤트를 등록하여 다른 곳 클릭 시 .comment-con 숨기기
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.comment-con, #modify').length) {
            $('.comment-con').css('display', 'none');
            $('.C1').css('display', 'block');
        }
    });

    // updateFromBook
    $('#favorite').on('click', '#commentCheck', function() {
        var $commentCon = $(this).closest('.comment-con');
        var commentValue = $commentCon.find('.modifyBox').val();

        if (commentValue.length > 30) {
            $commentCon.find('.error-message').show();
        } else {
            $commentCon.find('.error-message').hide();

            var cocktailName = $(this).closest('.info').find('.cocktail_name').text();
            var menuItem = list.find(menu => menu.name === cocktailName);

            updateFromBook(menuItem, commentValue);

            $(this).closest('.box').find('.C1').css('display', 'block');
            $(this).closest('.box').find('.comment-con').css('display', 'none');
        }
    });


    // 이벤트 위임을 사용하여 동적으로 생성된 .CII 요소에 이벤트 핸들러를 추가합니다.
    // 칵테일 이미지 위의 이미지 클릭시 그에맞는 동작 작동
    $('#favorite').on('click', '.CII', function(e) {
        e.preventDefault();

        // 클릭된 요소의 부모 요소를 찾아서 해당 칵테일 이름을 가져옵니다.
        var $box = $(this).closest('.box');
        var cocktailName = $box.find('.cocktail_name').text();

        // #cartYesNo의 class 이름 추출
        var cartStatus = $box.find('#cartYesNo').attr('class');

        if (cartStatus.includes('cartIn')) {
            // 칵테일 이름에 맞는 객체를 찾아서 addToCart 함수에 전달합니다.
            var menuItem = menuList.find(menu => menu.name === cocktailName);

            if (menuItem) {
                addToCart(menuItem);
                swal("SUCCESS",cocktailName+' 담기 완료',"success");
            } else {
                console.error('Menu item not found for name:', cocktailName);
            }
        } else if (cartStatus.includes('cartNo')) {
            swal("Error","판매 중단된 상품입니다","error");
        }
    });

    // .drop 요소가 클릭되면 해당 box를 삭제
    $('#favorite').on('click', '.drop', function(e) {
        var $box = $(this).closest('.box');
        e.preventDefault();

        // 선택한 요소를 기준으로 가장 가까운 조상 요소의 이름찾기
        var cocktailName = $box.find('.cocktail_name').text();

        // 칵테일 이름에 맞는 객체를 찾아서 deleteFromBook 함수에 전달합니다.
        var menuItem = list.find(menu => menu.name === cocktailName);

        if (menuItem) {
            swal({
                title: "DELETE",
                text: cocktailName + '를 즐겨찾기에서 삭제할까요?.',
                icon: "success",
                buttons: true,
            }).then((willDelete) => {
                if (willDelete) {
                    deleteFromBook(menuItem);
                    location.reload();
                }
            });
        } else {
            console.error('Menu item not found for name:', cocktailName);
        }
    });

    $('#favorite').on('keydown', '.modifyBox', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();  // Prevent the default action of the Enter key
            var $commentCon = $(this).closest('.comment-con');
            var commentValue = $(this).val();

            if (commentValue.length > 30) {
                $commentCon.find('.error-message').show();
            } else {
                $commentCon.find('.error-message').hide();

                var cocktailName = $(this).closest('.info').find('.cocktail_name').text();
                var menuItem = list.find(menu => menu.name === cocktailName);

                updateFromBook(menuItem, commentValue);

                $(this).closest('.box').find('.C1').css('display', 'block');
                $(this).closest('.box').find('.comment-con').css('display', 'none');
            }
        }
    });
}

