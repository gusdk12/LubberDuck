
window.addEventListener('load', () => {
    customerButtonsSet();
});

function customerButtonsSet() {
    $('#cartbuttonback').click(function(e){
        e.preventDefault();
        showCartBox();
    });
    $('#cartexit').click(function(e){
        e.preventDefault();
        hideCartBox();
    });
    $('#chatbuttonback').click(function(e){
        e.preventDefault();
        showChatBox();
    });
    $('#chatexit').click(function(e){
        e.preventDefault();
        hideChatBox();
    });
    $('#sendButton').click(function(e){
        e.preventDefault();
        sendCustomerChat();
    });
    $("#chat-input").keypress(function(e){
        if(e.keyCode && e.keyCode == 13){
            sendCustomerChat();
        }
    });
    $('#chatclear').click(function(e){
        e.preventDefault();
        clearChat();
    });
}
function sendCustomerChat(){
    if(document.getElementById('chatInput').value === "")
        return;

    addCustomerChat(document.getElementById('chatInput').value);
    document.getElementById('chatInput').value = "";
}
function hideCartBox(){
    $('#cartexit').addClass("hidden");
    $('#toPay').addClass("hidden");
    $('#cartboard').css({'width': '0px', 'height': '0px'});
    $('#cartcontent').addClass("hidden");
    $('#carttotal').addClass("hidden");
    $('#cartcontent').empty();
}
function showCartBox(){
    hideChatBox();
    loadCart(logged_id);

    $('#cartexit').removeClass("hidden");
    $('#toPay').removeClass("hidden");
    $('#cartboard').css({'width': '400px', 'height': '500px'});
    $('#cartcontent').removeClass("hidden");
    $('#carttotal').removeClass("hidden");
}
function hideChatBox(){
    $('#chatclear').addClass("hidden");
    $('#chatexit').addClass("hidden");
    $('#historycontainer').addClass("hidden");
    $('#sendcontainer').addClass("hidden");
    $('#chatboard').css({'width': '0px', 'height': '0px'});
}
function showChatBox(){
    hideCartBox();
    loadChat(logged_id);

    $('#chatclear').removeClass("hidden");
    $('#chatexit').removeClass("hidden");
    $('#historycontainer').removeClass("hidden");
    $('#sendcontainer').removeClass("hidden");
    $('#chatboard').css({'width': '400px', 'height': '500px'});
}

function waitForBartenderAnswer(){
    document.getElementById('chatInput').disabled = true;
    document.getElementById('sendButton').disabled = true;
    $('#chatInput').css({'background-color': '#b2ada4'});
    $('#chatInput').css({'caret-color': 'transparent'});
    $('#sendImg').css({'background-image': 'url(\'/img/maindeco/chatLoading.png\')'});
    $('#sendImg').addClass("rotateLoading");
}
function deliveredBartenderAnswer(){
    document.getElementById('chatInput').disabled = false;
    document.getElementById('sendButton').disabled = false;
    $('#chatInput').css({'background-color': '#fff8ea'});
    $('#chatInput').css({'caret-color': 'black'});
    $('#sendImg').removeClass("rotateLoading");
    $('#sendImg').css({'background-image': 'url(\'/img/maindeco/chatSend.png\')'});
}