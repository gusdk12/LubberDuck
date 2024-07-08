
async function addOrder(user_id, itemList) {
    if (!user_id)
        return;

    await $.ajax({
        url: "/order/addOrder/" + user_id,
        type: "POST",
        cache: false,
        success: function (data, status) {
            if (status === "success") {
                if (data.status !== "OK") {
                    alert(data.status);
                    return;
                }

                itemList.forEach(item => addOrderItem(data.order_id, item));
            }
        },
    });
}

async function addOrderItem(order_id, item) {
    if (!item || item.sequence === -1)
        return;

    const data = {
        "order_id": order_id,
        "menu_id": item.menu_id,
        "quantity": item.quantity,
        "price": item.price,
    };

    await $.ajax({
        url: "/order/addOrderItem",
        type: "POST",
        data: data,
        cache: false,
        success: function (data, status) {
            if (status === "success") {
                if (data.status !== "OK") {
                    alert(data.status);
                    return;
                }
            }
        },
    });
}

async function avgRate(cocktail) {
    $.ajax({
        url: "/order/starRate/" + cocktail.id,
        type:"GET",
        cache: false,
        success: function (data, status) {
            if(status === "success") {
                if (data.status !== "OK") {
                    alert(data.status);
                    return;
                }
                buildRate(data.data);
            }
        }
    })
}

function buildRate(data) {
    var avgRate = data && data.avgRate ? data.avgRate : 0;

    $('.star-ratings-fill').css('width', (avgRate  * 20) + '%').append($(`
        <img src='/img/review/star_32.png' alt="별1">
        <img src='/img/review/star_32.png' alt="별1">
        <img src='/img/review/star_32.png' alt="별1">
        <img src='/img/review/star_32.png' alt="별1">
        <img src='/img/review/star_32.png' alt="별1">
    `))

    $('#star').append($(`
        <div class="star-ratings-score">${avgRate}</div>
    `));
}