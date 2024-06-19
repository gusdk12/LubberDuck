
// $(document).ready(function() {
//
//     // Show the comment-con when heartImg is clicked
//     $('#heartImg').on('click', function(event) {
//         $('.comment-con').css('display', 'block');
//         $('.comment').css('height','200px');
//     });
// });

window.addEventListener('load', () => {

    loadMenu();
    addEvent();

});
window.addEventListener('popstate', function(event) {
    // This code runs when the back button is clicked
    alert('popstate event triggered');
    location.reload(); // Refresh the page
});

async function loadMenu(){
    $('#img').css({'background-image': `url('${menu.imgUrl}')`});
    document.querySelector(`#name`).textContent = `${menu.name}`;
    document.querySelector(`#info`).textContent = `${menu.info}`;
    document.querySelector(`#price`).textContent = `${menu.price} ￦`;
    var cocktailName = `${menu.name}`;

    // /가연
    const isBookmarked = await checkBook(menu);

    if (isBookmarked) {
        $('#container').find('#heart').removeClass('emptyHeart').removeClass('fullHeart').addClass('fullHeart');
    } else {
        $('#container').find('#heart').removeClass('fullHeart').removeClass('emptyHeart').addClass('emptyHeart');
    }

    // Show the comment-con when heartImg is clicked
    $('.emptyHeart').click(function(event) {
        event.stopPropagation(); // Prevent the click event from propagating to the document
        $('.comment-con').css('display', 'block');
        $('.comment').css('height', '0px');
        $('.comment').animate({
            height: '200px'
        }, 200);
    });

    // heart2 클릭 시 heart1으로 변경
    $('.fullHeart').click(function(event) {
        event.stopPropagation();
        $(this).removeClass('fullHeart').addClass('emptyHeart');
        deleteFromBook(menuList.find(menu => menu.name === cocktailName));
        alert(cocktailName+'가 즐겨찾기에서 삭제되었습니다.')

        // heart1 이벤트 다시 설정
        $('.emptyHeart').click(function(event) {
            event.stopPropagation();
            $('.comment-con').css('display', 'block');
        });
    });

    // Hide the comment-con when clicking outside of it
    $(document).click(function(event) {
        if (!$(event.target).closest('.comment-con').length && !$(event.target).closest('#heartImg').length) {
            $('.comment-con').css('display', 'none');
        }
    });

    // 가연/
}
function addEvent(){
    $('#toCart').click(function(){
        var cocktailName = $(this).parent().siblings("#name").text();
        addToCart(menuList.find(menu => menu.name === cocktailName));
    });

    $('#commentCheck').click(function() {
        var cocktailName = $(this).closest('#cocktailsection').find('#name').text();
        var commentValue = $(this).closest('#cocktailsection').find('.comment').val();
        addToBook(menuList.find(menu => menu.name === cocktailName), commentValue);
        alert('즐겨찾기에 추가되었습니다');

        $('#container').find('#heart').removeClass('emptyHeart').removeClass('fullHeart').addClass('fullHeart');
        $('#container').find('.comment-con').css('display', 'none');

        // heart2 클릭 시 heart1으로 변경
        $('.fullHeart').click(function(event) {
            event.stopPropagation();
            $(this).removeClass('fullHeart').addClass('emptyHeart');
            deleteFromBook(menuList.find(menu => menu.name === cocktailName));
            alert(cocktailName+'가 즐겨찾기에서 삭제되었습니다.')
            $('#container').find('.comment').val('');

            // heart1 이벤트 다시 설정
            $('.emptyHeart').click(function(event) {
                event.stopPropagation();
                $('.comment-con').css('display', 'block');
                $('.comment').css('height', '0px');
                $('.comment').animate({
                    height: '200px'
                }, 200);
            });
        });
    });
}