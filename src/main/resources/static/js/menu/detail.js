
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

    // /가연
    const isBookmarked = await checkBook(menu);

    if (isBookmarked) {
        $('#container').find('#heart').removeClass('heart1').removeClass('heart2').addClass('heart2');
    } else {
        $('#container').find('#heart').removeClass('heart2').removeClass('heart1').addClass('heart1');
    }

    // Show the comment-con when heartImg is clicked
    $('.heart1').off('click').on('click', function(event) {
        event.stopPropagation(); // Prevent the click event from propagating to the document
        $('.comment-con').css('display', 'block');
        $('.comment').css('height','200px');
    });

    $('.heart2').off('click').on('click', function(event) {
        event.stopPropagation(); // Prevent the click event from propagating to the document
        alert('이미 즐겨찾기에 담은 상품입니다.');
    });

    // Hide the comment-con when clicking outside of it
    $(document).off('click').on('click', function(event) {
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

        $('#container').find('#heart').removeClass('heart1').removeClass('heart2').addClass('heart2');
        $('#container').find('.comment-con').css('display', 'none');

        // heart2 클릭 시 알림 표시 (동적으로 이벤트 재설정 필요)
        $('.heart2').off('click').on('click', function(event) {
            event.stopPropagation();
            alert('이미 즐겨찾기에 담은 상품입니다.');
        });
    });
}