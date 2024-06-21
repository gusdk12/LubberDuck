

function loadChat(user_id) {
    $.ajax({
        url: "/chat/list/" + user_id,
        type: "GET",
        cache: false,
        success: function (data, status) {
            if (status === "success") {
                // 서버쪽 에러 메세지 있는경우
                if (data.status !== "OK") {
                    alert(data.status);
                    return;
                }

                buildChat(data.data, data.menudata);
            }
        },
    });
}

function buildChat(data, menudata){
    $('#historycontainer').empty();
    data.forEach(chat => {
        if(chat.role === "바텐더"){
            const findMenu = menudata.find(menu => chat.content.includes(menu.name));
            let menuData = "";
            if(findMenu){
                menuData = `<div class="chatMenuInfo" style="background-image: url(${findMenu.imgUrl})" onClick="location.href ='/menu/detail/${findMenu.id}'"></div>`;
            }

            $('#historycontainer').append(`
                <div class="bartenderChat">
                    ${chat.content.replaceAll("\\n", "<br>")}
                    ${menuData}
                </div>
            `);

        } else if(chat.role === "손님"){
            $('#historycontainer').append(`
                <div class="customerChat">${chat.content}</div>
            `);
        }
    });

    // for(menuInfo of document.querySelectorAll(".chatMenuInfo")){
    //
    // }
}

function addCustomerChat(content){
    const data = {
        "user_Id": logged_id,
        "role": "손님",
        "content": content,
    };

    $.ajax({
        url: "/chat/add",
        type: "POST",
        data: data,
        cache: false,
        success: function(data, status){
            if(status === "success"){
                if(data.status !== "OK"){
                    alert(data.status);
                    return;
                }
                loadChat(logged_id);
                requestBartendarChat();
            }
        },
    });
}
async function requestBartendarChat() {

    waitForBartenderAnswer();

    const data = {
        "user_Id": logged_id,
        "role": "바텐더"
    };

    await $.ajax({
        url: "/chat/request",
        type: "POST",
        data: data,
        cache: false,
        success: function (data, status) {
            if (status === "success") {
                if (data.status !== "OK") {
                    alert(data.status);
                    return;
                }
                deliveredBartenderAnswer();
                loadChat(logged_id);
            }
        },
    });
}

function clearChat(){
    $.ajax({
        url: "/chat/clear/" + logged_id,
        type: "POST",
        cache: false,
        success: function(data, status){
            if(status === "success"){
                if(data.status !== "OK"){
                    alert(data.status);
                    return;
                }
                loadChat(logged_id);
            }
        },
    });
}
