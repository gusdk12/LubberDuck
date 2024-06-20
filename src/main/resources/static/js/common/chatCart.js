
window.addEventListener('load', () => {

    customerButtonsSet();

});

function customerButtonsSet() {
    $('#cartbuttonback').click(function(){
        showCartBox();
    });
    $('#cartexit').click(function(){
        hideCartBox();
    });
    $('#chatbuttonback').click(function(){
        showChatBox();
    });
    $('#chatexit').click(function(){
        hideChatBox();
    });
}

function hideCartBox(){
    $('#cartexit').addClass("hidden");
    $('#cartboard').css({'width': '0px', 'height': '0px'});
    $('#cartcontent').addClass("hidden");
    $('#carttotal').addClass("hidden");
    $('#cartcontent').empty();
}
function showCartBox(){
    hideChatBox();
    loadCart(logged_id);

    $('#cartexit').removeClass("hidden");
    $('#cartboard').css({'width': '400px', 'height': '500px'});
    $('#cartcontent').removeClass("hidden");
    $('#carttotal').removeClass("hidden");
}
function hideChatBox(){
    $('#chatexit').addClass("hidden");
    $('#historycontainer').addClass("hidden");
    $('#sendcontainer').addClass("hidden");
    $('#chatboard').css({'width': '0px', 'height': '0px'});
}
function showChatBox(){
    hideCartBox();
    $('#chatexit').removeClass("hidden");
    $('#historycontainer').removeClass("hidden");
    $('#sendcontainer').removeClass("hidden");
    $('#chatboard').css({'width': '400px', 'height': '500px'});
}