let cartMenuId = [];


window.addEventListener('load', () => {
    loadCartData();
    addEvent();
});

function addEvent(){
    $('#payButton').click(function(e){
        e.preventDefault();
        payComplete();
    });
}

function payComplete(){
    $.ajax({
        url: "/cart/clear/" + logged_id,
        type: "POST",
        cache: false,
        success: async function (data, status) {
            if (status === "success") {
                if (data.status !== "OK") {
                    alert(data.status);
                    return;
                }

                await addOrder(logged_id, cartMenuId);
                alert("결제가 완료되었습니다.")
                location.href = '/home';
            }
        },
    });
}

function loadCartData() {
    $.ajax({
        url: "/cart/list/" + logged_id,
        type: "GET",
        cache: false,
        success: function (data, status) {
            if (status === "success") {
                if (data.status !== "OK") {
                    alert(data.status);
                    return;
                }

                buildCartToHTML(data);
            }
        },
    });
}

function buildCartToHTML(data){
    cartMenuId = [];

    let totalPrice = 0;
    data.data.forEach(item => {
        let itemInfo = {
            menu_id : item.menu_id,
            quantity : item.quantity,
            price : item.menu.price
        }
        cartMenuId.push(itemInfo);

        totalPrice += (item.menu.price * item.quantity);
        $('#cartlistsection').append(`
            <div class="cartItem">
                <div class="itemImg" style="background-image: url('${item.menu.imgUrl}')"></div>
                <div class="itemInfo">
                    <div class="itemName">${item.menu.name}</div>
                    <div class="quantity">${item.quantity}개</div>
                    <div class="itemPrice">${item.menu.price * item.quantity}원</div>
                </div>
            </div>
            <div class="itemLine"></div>
        `);
    });
    $('#cartlistsection').append(`
        <div class="totalItem">
            <div>총 추문 금액</div>
            <div>${totalPrice}원</div>
        </div>
    `);

}

