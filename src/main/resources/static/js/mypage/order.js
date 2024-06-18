$(document).ready(function(){
    // 사이드바 메뉴 클릭시 css 변경
    $('.sm').eq(1).css({
        'background-color':'#FCF7EF',
        'border-radius' : "10px 0 0 10px",
        'color' : '#54320f',
        'font-weight': 'bold'
    });

    buildBody();
});

function buildBody(){
    orderList.forEach(order => {
        let itemsHTML = "";
        let totalPrice = 0;
        orderItemMap[order.id].forEach(item => {
            itemsHTML += `
                <div class="items">
                    <div class="item">
                        <span class="item-name">${item.menu.name}</span>
                        <span class="quantity">${item.quantity}</span>
                        <span class="item-price" >${item.price}</span>
                        <span>
                            <input type="button" value="리뷰작성" name="reviewBtn" onclick="location.href='/review/write'">
                        </span>
                    </div>
                </div>`;
            totalPrice += (item.price * item.quantity);
        });

        $('.container').append(`
            <div class="receipt">
            <div class="background">
                <img src="/img/mypage/receipt.png">
                </div>
                <div class="content">
                    <h2 class="shopname">LubberDuck</h2>
                    <div class="header-info">
                        <p class="name">${user.nickname}님</p>
                        <p class="date-time">${order.regdate}</p>
                    </div>
                    <p class="order-nm">주문번호: ${order.id}</p>
                    <div class="dashed"></div>
                    <div class="item-header">
                        <span class="menuName">&lt;메뉴이름&gt;</span>
                        <span class="quantity">&lt;주문수량&gt;</span>
                        <span class="menuPrice">&lt;메뉴가격&gt;</span>
                        <span class="review">&lt;리뷰작성&gt;</span>
                    </div>
                    <div class="dashed"></div>
                    ${itemsHTML}
                    <div class="dashed"></div>
                    <div class="totals">
                        <div class="total-item">
                            <span class="total-price"></span>
                            <span>${totalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });
}
