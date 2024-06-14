
function addToCart(cocktailName) {
    // alert(cocktailName);

    // // 전달할 parameter 준비 (POST)
    // const data = {
    //     "user_id": logged_id,
    //     "cocktail_id": ,
    //     "quantity": ,
    // };

    // currentCart.forEach(item => {
    //     alert("유저이름" + item.user.username + "칵테일이름" + item.menu.name + "수량" + item.quantity);
    // });
    // $.ajax({
    //     url: "/comment/write",
    //     type: "POST",
    //     data: data,
    //     cache: false,
    //     success: function(data, status){
    //         if(status == "success"){
    //             if(data.status !== "OK"){
    //                 alert(data.status);
    //                 return;
    //             }
    //             loadComment(id);  // 댓글목록 다시 업데이트
    //             $("#input_comment").val('');
    //         }
    //     },
    // });
}


// 특정 글(post_id) 의 댓글 목록 읽어오기
async function loadCart(user_id) {
    await $.ajax({
        url: "/cart/list/" + user_id,
        type: "GET",
        cache: false,
        success: function (data, status) {
            if (status == "success") {
                // 서버쪽 에러 메세지 있는경우
                if (data.status !== "OK") {
                    alert("실패");
                    alert(data.status);
                    return;
                }

                let list = [];
                data.data.forEach(item => {
                    // alert("유저이름" + item.user.username + "칵테일이름" + item.menu.name + "수량" + item.quantity);
                    list.push(item)
                });
                return list;
            }
        },
    });

}

