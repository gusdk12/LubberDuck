window.addEventListener('load', () => {
    loadMenu();
    addEvent();
});

window.addEventListener('popstate', function(event) {
    // This code runs when the back button is clicked
    alert('popstate event triggered');
    location.reload(); // Refresh the page
});

async function loadMenu() {
    $('#img').css({'background-image': `url('${menu.imgUrl}')`});
    document.querySelector(`#name`).textContent = `${menu.name}`;
    document.querySelector(`#info`).textContent = `${menu.info}`;
    document.querySelector(`#price`).textContent = `${menu.price} ￦`;
    var cocktailName = `${menu.name}`;

    // 로그인 상태일때만 불러오기
    if (logged_id !== -1) {
        const isBookmarked = await checkBook(menu);

        // 즐겨찾기 존재여부에 따른 클래스 설정
        isBookmarked && switchToFullHeart(); // 참
        isBookmarked || switchToEmptyHeart(); // 거짓
    }
}

function addEvent(){

    // Hide the comment-con when clicking outside of it
    $(document).click(function(event) {
        if (!$(event.target).closest('.comment-con').length && !$(event.target).closest('#heartImg').length) {
            $('.comment-con').css('display', 'none');
        }
    });

    // addToCart
    $('#toCart').click(function(){
        var cocktailName = $(this).parent().siblings("#name").text();
        addToCart(menuList.find(menu => menu.name === cocktailName));
    });

    // addToBook
    $('#heart').click(function(event) {
        if(event.target.className === "fullHeart"){
            var cocktailName = $(this).closest('#cocktailsection').find('#name').text();
            event.stopPropagation();
            deleteFromBook(menuList.find(menu => menu.name === cocktailName));
            alert(cocktailName+'가 즐겨찾기에서 삭제되었습니다.')

            switchToEmptyHeart();
        } else if(event.target.className === "emptyHeart"){
            event.stopPropagation();
            openComment();
        }
    });

    $('#commentCheck').click(function() {
        var cocktailName = $(this).closest('#cocktailsection').find('#name').text();
        var commentValue = $(this).closest('#cocktailsection').find('.comment').val();
        addToBook(menuList.find(menu => menu.name === cocktailName), commentValue);
        alert('즐겨찾기에 추가되었습니다');

        switchToFullHeart();
        closeComment();
    });
}

function switchToFullHeart(){
    $('#container').find('#heart').removeClass('emptyHeart').removeClass('fullHeart').addClass('fullHeart');
}

function switchToEmptyHeart(){
    $('#container').find('#heart').removeClass('emptyHeart').removeClass('fullHeart').addClass('emptyHeart');
}

// 코맨트창 열기
function openComment(){
    $('.comment-con').css('display', 'block');
    $('.comment').css('height', '200px');
}

// 코맨트창 닫기
function closeComment(){
    $('#container').find(".comment").val('');
    $('.comment-con').css('display', 'none');
    $('.comment').css('height', '0px');
}