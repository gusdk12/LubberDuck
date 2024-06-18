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

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // 두 자리 숫자를 맞추기 위해 padStart 사용
    const formattedDate = `${year}년 ${month}월 ${day}일 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedDate;
}


function buildBody(){
    orderList.forEach(order => {
        let itemsHTML = "";
        let totalPrice = 0;
        orderItemMap[order.id].forEach(item => {
            let formattedItemPrice = item.price.toLocaleString('ko-KR');
            itemsHTML += `
                <div class="items">
                    <div class="item">
                        <span class="item-name">${item.menu.name}</span>
                        <span class="quantity">${item.quantity}</span>
                        <span class="item-price" >${formattedItemPrice}</span>
                        <span>
                            <input type="button" value="리뷰작성" name="reviewBtn" onclick="location.href='/review/write'">
                        </span>
                    </div>
                </div>`;
            totalPrice += (item.price * item.quantity);
        });

        let formattedTotalPrice = totalPrice.toLocaleString('ko-KR');

        let formattedRegDate = formatDateTime(order.regdate);

        $('.container').append(`
            <div class="receipt">
            <div class="background">
                <img src="/img/mypage/receipt.png">
                </div>
                <div class="content">
                    <h2 class="shopname">LubberDuck</h2>
                    <div class="header-info">
                        <p class="name">${user.nickname}님</p>
                        <p class="date-time">${formattedRegDate}</p>
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
                             <span class="total-price">TOTAL : ${formattedTotalPrice}원</span>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });
}
