
$(document).ready(function() {
    // 페이지 로드 시 로컬 스토리지에서 하트 상태를 불러오기
    // if (localStorage.getItem('heartStatus') === 'heart2') {
    //     $('#heart').removeClass('heart1').addClass('heart2');
    // }

    // Show the comment-con when heartImg is clicked
    $('#heartImg').on('click', function(event) {
        event.stopPropagation(); // Prevent the click event from propagating to the document
        $('.comment-con').css('display', 'block');
    });

    // Hide the comment-con when clicking outside of it
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.comment-con').length && !$(event.target).closest('#heartImg').length) {
            $('.comment-con').css('display', 'none');
        }
    });

});

window.addEventListener('load', () => {

    loadMenu();
    addEvent();

});
window.addEventListener('popstate', function(event) {
    // This code runs when the back button is clicked
    alert('popstate event triggered');
    location.reload(); // Refresh the page
});

function loadMenu(){
    $('#img').css({'background-image': `url('${menu.imgUrl}')`});
    document.querySelector(`#name`).textContent = `${menu.name}`;
    document.querySelector(`#info`).textContent = `${menu.info}`;
    document.querySelector(`#price`).textContent = `${menu.price} ￦`;

    if(checkBook()){
        $('#container').find('#heart').removeClass('heart1').addClass('heart2');
    }else {
        $('#container').find('#heart').removeClass('heart2').addClass('heart1');
    }
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

        $('#container').find('.comment-con').css('display', 'none');
    });
}