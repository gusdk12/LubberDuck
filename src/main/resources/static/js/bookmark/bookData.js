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

    // 즐겨찾기에 이미 같은 상품이 담겨있는지 확인하기
    let findBook = null;

    await $.ajax({
        url: "/bookmark/detail/" + logged_id + "/" + cocktail.id,
        type: "GET",
        cache: false,
        success: function (data, status) {
            if (status === "success") {
                if (data.status !== "OK") {
                    alert(data.status);
                    return;
                }
                findBook = data.data;
            }
        },
    });

    //  카트에 같은 칵테일이 없다면, 카트에 추가한다.
    if(!findBook){
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

    // 즐겨찾기에 같은 칵테일이 있다면 이미 존재하는 음료 알림
    else {
        alert('이미 즐겨찾기 설정한 음료입니다.');
    }
}

// 삭제하기
async function deleteFromBook(cocktail){

    // 존재한다면 아예 삭제
    // if(findBook){
        $.ajax({
            url: "/bookmark/delete/" + logged_id + "/" + cocktail.id,
            type: "POST",
            cache: false,
            success: function(data, status){
                if(status === "success"){
                    if(data.status !== "OK"){
                        alert(cocktail.id);
                        alert(data.status);
                        return;
                    }
                }
            },
        });
    // }
}

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
                            <img src="/img/bookmark/cartIn.png" alt="담기" id="cartIn">
                        </div>
                    </div>
                    <div class="CI">
                        <p class="C1"> ${book.comment}</p>
                        <div class="I">
                            <img src="/img/bookmark/modify.png" alt="수정" id="modify">
                        </div>
                        
                        <div class="comment-con">
                            <textarea class="modifyBox"></textarea>
                            <img src="/img/bookmark/check.png" id="commentCheck">
                        </div>
                    </div>
                </div>
            </div>
         
        `)

    });

    $(".box").hover(
        function() {
            $(this).find(".drop").css('display', 'block');
        },
        function() {
            $(this).find(".drop").css('display', 'none');
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

    $(".I").click(
        function() {
            $(this).closest('.box').find('.comment-con').css('display', 'block');
        },
        function() {
            $(this).closest('.box').find('.comment-con').css('display', 'none');
        }
    )

    // 이벤트 위임을 사용하여 동적으로 생성된 요소에 이벤트 핸들러를 추가합니다.
    $('#favorite').on('click', '.CII', function(e) {
        e.preventDefault();

        // 클릭된 요소의 부모 요소를 찾아서 해당 칵테일 이름을 가져옵니다.
        var cocktailName = $(this).closest('.box').find('.cocktail_name').text();

        // 칵테일 이름에 맞는 객체를 찾아서 addToCart 함수에 전달합니다.
        var menuItem = menuList.find(menu => menu.name === cocktailName);

        if (menuItem) {
            addToCart(menuItem);
        } else {
            console.error('Menu item not found for name:', cocktailName);
        }
    });

    // .drop 요소가 클릭되면 해당 box를 삭제
    $('#favorite').on('click', '.drop', function(e) {
        e.preventDefault();

        // 클릭된 요소의 부모 요소를 찾아서 해당 칵테일 이름을 가져옵니다.
        var cocktailName = $(this).closest('.box').find('.cocktail_name').text();

        // 칵테일 이름에 맞는 객체를 찾아서 deleteFromBook 함수에 전달합니다.
        var menuItem = list.find(menu => menu.name === cocktailName);

        if (menuItem){
            deleteFromBook(menuItem);
        }else {
            console.error('Menu item not found for name:', cocktailName);
        }

        alert(cocktailName+'가 즐겨찾기에서 삭제되었습니다.');
        $(this).closest('.box').remove();
    });

    $('#favorite').on('click','#commentCheck', function(e){
        alert('신지');
    });
}

