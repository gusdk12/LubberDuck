
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
    if (!item)
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

