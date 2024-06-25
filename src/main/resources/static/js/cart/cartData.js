
async function addToCart(cocktail) {

    if(cocktail == null || logged_id === -1){
        // alert("칵테일의 값이 없습니다.")
        return;
    }

    // 카트에 이미 같은 아이디가 있는지 검색하기
    let findCart = null;
    // findItemInCart(cocktail.id);
    await $.ajax({
        url: "/cart/detail/" + logged_id + "/" + cocktail.id,
        type: "GET",
        cache: false,
        success: function (data, status) {
            if (status === "success") {
                if (data.status !== "OK") {
                    alert(data.status);
                    return;
                }
                findCart = data.data;
            }
        },
    });

    //  카트에 같은 칵테일이 없다면, 카트에 추가한다.
    if(!findCart){
        // 전달할 parameter 준비 (POST)
        const data = {
            "userId": logged_id,
            "cocktailId": cocktail.id,
            "quantity": 1,
        };

        $.ajax({
            url: "/cart/add",
            type: "POST",
            data: data,
            cache: false,
            success: function(data, status){
                if(status === "success"){
                    if(data.status !== "OK"){
                        alert(data.status);
                        return;
                    }
                    loadCart(logged_id);
                }
            },
        });
    }
    //  카트에 같은 칵테일이 있다면, 수량만 증가시킨다
    else {
        $.ajax({
            url: "/cart/incQuantity/" + logged_id + "/" + cocktail.id,
            type: "POST",
            cache: false,
            success: function(data, status){
                if(status === "success"){
                    if(data.status !== "OK"){
                        alert(data.status);
                        return;
                    }
                    loadCart(logged_id);
                }
            },
        });
    }
}
async function deleteFromCart(cocktail) {

    // 카트에 검색하기
    let findCart = null;
    // findItemInCart(cocktail.id);
    await $.ajax({
        url: "/cart/detail/" + logged_id + "/" + cocktail.id,
        type: "GET",
        cache: false,
        success: function (data, status) {
            if (status === "success") {
                if (data.status !== "OK") {
                    alert(data.status);
                    return;
                }
                findCart = data.data;
            }
        },
    });

    // 담긴 칵테일의 개수가 1보다 크다면, 수량만 감소시킨다
    if(findCart.quantity > 1){
        $.ajax({
            url: "/cart/decQuantity/" + logged_id + "/" + cocktail.id,
            type: "POST",
            cache: false,
            success: function(data, status){
                if(status === "success"){
                    if(data.status !== "OK"){
                        alert(data.status);
                        return;
                    }
                    loadCart(logged_id);
                }
            },
        });
    }
    // 담긴 칵테일의 수가 1개라면, 아예 delete한다.
    else if(findCart.quantity === 1){
        $.ajax({
            url: "/cart/delete/" + logged_id + "/" + cocktail.id,
            type: "POST",
            cache: false,
            success: function(data, status){
                if(status === "success"){
                    if(data.status !== "OK"){
                        alert(data.status);
                        return;
                    }
                    loadCart(logged_id);
                }
            },
        });
    }
}

let cartSize = 0;


function loadCart(user_id) {
    $.ajax({
        url: "/cart/list/" + user_id,
        type: "GET",
        cache: false,
        success: function (data, status) {
            if (status === "success") {
                // 서버쪽 에러 메세지 있는경우
                if (data.status !== "OK") {
                    alert(data.status);
                    return;
                }

                cartSize = data.count;
                buildCart(data);
            }
        },
    });

}

function buildCart(cart){
    let scrollableDiv = document.getElementById('cartcontent');
    let currentscrollTop = scrollableDiv.scrollTop;

    $('#cartcontent').empty();
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
                        <div id="cartitemquantity">
                            <div id="quantityminus"></div>
                            <div id="quantitytext">수량 : ${item.quantity}</div>
                            <div id="quantityplus"></div>
                        </div>
                        <div id="cartitemprice">${price}￦</div>
                    </div>
                </div>
            `);
    });

    for(cocktailadd of document.querySelectorAll("#quantityplus")){
        cocktailadd.addEventListener("click", function(e){
            e.preventDefault();
            var cocktailName = $(this).parent().siblings("#cartitemname").text();
            addToCart(menuList.find(menu => menu.name === cocktailName));
        });
    }
    for(cocktaildelete of document.querySelectorAll("#quantityminus")){
        cocktaildelete.addEventListener("click", function(e){
            e.preventDefault();
            var cocktailName = $(this).parent().siblings("#cartitemname").text();
            deleteFromCart(menuList.find(menu => menu.name === cocktailName));
        });
    }

    $('#cartcontent').append(`
                <div id="cartline"></div>
            `);

    scrollableDiv.scrollTop = currentscrollTop;
    document.querySelector(`#carttotal`).textContent = `Total ${totalPrice} ￦`;
}
