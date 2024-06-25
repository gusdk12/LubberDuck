

window.addEventListener('load', () => {
    loadCartData();
});

function loadCartData() {
    $.ajax({
        url: "/cart/list/" + logged_id,
        type: "GET",
        cache: false,
        success: async function (data, status) {
            if (status === "success") {
                if (data.status !== "OK") {
                    alert(data.status);
                    return;
                }
                let cartItems = [];
                data.data.forEach(item => {
                    let itemInfo = {
                        menu_id : item.menu_id,
                        quantity : item.quantity,
                        price : item.menu.price
                    }
                    cartItems.push(itemInfo);
                });

                await payComplete();
                await addOrder(logged_id, cartItems);
                swal('성공!', "결제가 완료되었습니다.",'success')
                    .then(function(){
                        location.href = "/home";
                    })
            }
        },
    });
}

async function payComplete() {
    await $.ajax({
        url: "/cart/clear/" + logged_id,
        type: "POST",
        cache: false,
        success: async function (data, status) {
            if (status === "success") {
                if (data.status !== "OK") {
                    alert(data.status);
                    return;
                }
            }
        },
    });
}