
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

                buildCart(data);

                // let list = [];
                // data.data.forEach(item => {
                //     // alert("유저이름" + item.user.username + "칵테일이름" + item.menu.name + "수량" + item.quantity);
                //     list.push(item)
                // });
                // return list;
            }
        },
    });

}

function buildCart(cart){
    let totalPrice = 0;
    cart.data.forEach(item => {
        let price = item.menu.price * item.quantity;
        totalPrice += price;

        $('#cartcontent').append(`
                <div id="cartline"></div>
                <div id="cartbox">
                    <div id="cartitemimg" style="background-image: url(${item.menu.imgUrl})"></div>
                    <div id="cartiteminfo">
                        <div id="cartitemname">${item.menu.name}</div>
                        <div id="cartitemquantity">수량 : ${item.quantity}</div>
                        <div id="cartitemprice">${price}￦</div>
                    </div>
                </div>
            `);
    });

    $('#cartcontent').append(`
                <div id="cartline"></div>
            `);
    document.querySelector(`#carttotal`).textContent = `Total ${totalPrice} ￦`;
}
