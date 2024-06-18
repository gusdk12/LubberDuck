
$(document).ready(function() {
    // $('#heartImg').on('click', function() {
    //     $('#heart').toggleClass('heart2 heart1');
    // });

    $('#heartImg').on('click',function(){
        $('.comment-con').css('display','block');
    })
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
    });
}