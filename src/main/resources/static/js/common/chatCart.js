
function customerButtonsSet() {
    $('#board').click(function(){
        showCartBox();
    });
    $('#exit').click(function(){
        hideCartBox();
    });
}

function hideCartBox(){
    $('#chat').removeClass("hidden");
    $('#board').removeClass("hidden");
    $('#exit').addClass("hidden");
    $('#cartcontent').addClass("hidden");
    $('#carttotal').addClass("hidden");
    $('#cutomerButtons').stop().animate({'width': '170px', 'height': '80px'}, 100);
    // $('#cutomerButtons').css({'width': '170px', 'height': '80px'});
    $('#buttonsbackground').css({'content': 'none'});
    $('#cartcontent').empty();
}
function showCartBox(){
    loadCart(logged_id);
    $('#chat').addClass("hidden");
    $('#board').addClass("hidden");
    $('#exit').removeClass("hidden");
    $('#cutomerButtons').stop().animate({'width': '400px', 'height': '500px'}, 100);
    // $('#cutomerButtons').css({'width': '400px', 'height': '500px'});
    $('#buttonsbackground').css({'content': 'url("/img/management/menu.jpg")'});
    $('#cartcontent').removeClass("hidden");
    $('#carttotal').removeClass("hidden");
}
function hideChatBox(){

}
function showChatBox(){

}