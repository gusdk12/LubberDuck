
let totalPrice = 0;
let menuImgs = [];

window.addEventListener('load', () => {
    loadCartData();
    addEvent();
});

function addEvent(){
    $('#payButton').click(function(e){
        e.preventDefault();
        $('#user_id').val(logged_id);
        $('#totalPrice').val(totalPrice);

        document.forms['payForm'].submit();
    });

    // const animationDiv = document.getElementById('payButton');
    // animationDiv.addEventListener('mouseenter', function(event) {
    //     menuImgs.forEach(img => {
    //             $('#paysection').append(`
    //                 <div className="cocktailPikabu"></div>
    //             `);
    //         }
    //     );
    // });
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
    data.data.forEach(item => {
        if(item.menu.sequence === -1) return;
        totalPrice += (item.menu.price * item.quantity);
        menuImgs.push(item.menu.imgUrl);
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

