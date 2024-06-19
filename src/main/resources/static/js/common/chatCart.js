
window.addEventListener('load', () => {

    customerButtonsSet();

});

function customerButtonsSet() {
    $('#cartbuttonback').click(function(){
        showCartBox();
    });
    $('#exit').click(function(){
        hideCartBox();
    });
}

function hideCartBox(){
    $('#exit').addClass("hidden");
    $('#cartboard').css({'width': '0px', 'height': '0px'});
    $('#cartcontent').addClass("hidden");
    $('#carttotal').addClass("hidden");
    $('#cartcontent').empty();
}
function showCartBox(){
    loadCart(logged_id);

    $('#exit').removeClass("hidden");
    $('#cartboard').css({'width': '400px', 'height': '500px'});
    $('#cartcontent').removeClass("hidden");
    $('#carttotal').removeClass("hidden");
}
function hideChatBox(){

}
function showChatBox(){

}