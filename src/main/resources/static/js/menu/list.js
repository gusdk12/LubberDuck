
var paperCount = 0;

window.addEventListener('load', () => {
    preloadImages();
    appendMenuToPlate();
    showCustomerButtons();
    customerButtonsSet();

});
window.addEventListener('unload', function(e){
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
    });
});

function preloadImages(){
    // 미리 로드할 이미지 URL 목록
    var images = [
        '/img/management/menu.jpg'
    ];

    for(let menu of menuList){
        images.push(menu.imgUrl);
    }

    // 각 이미지 URL을 순회하며 로드
    $.each(images, function(index, url) {
        $('<img>').attr('src', url).addClass('hidden').appendTo('body');
    });
}

function showCustomerButtons(){
    document.getElementById("rightsection") && $('#rightsection').css({bottom: '-40%'});
}

function appendMenuToPlate(){
    let count = 0;
    paperCount = 0;
    let $menuPlate = $('.menu');
    let $currentPaper = null;

    menuList.forEach(cocktail => {
        if(count % 4 === 0){
            paperCount++;

            (paperCount % 2 === 0) && $menuPlate.append(`<div class="paperLeft" id=paper${paperCount}></div>`);
            (paperCount % 2 === 1) && $menuPlate.append(`<div class="paperRight" id=paper${paperCount}></div>`);
            $currentPaper = $(`#paper${paperCount}`);
        }

        if(count % 2 === 0) {
            $currentPaper.append(`
                <div class="cocktailpart">
                    <div class="thumbnail" style="background-image: url('${cocktail.imgUrl}')"></div>
                    <div class="explain">
                        <div class="cocktailname">${cocktail.name}</div>
                        <div class="cocktailinfo">${cocktail.info}</div>
                        <div class="cocktailprice">${cocktail.price}￦</div>
                        <div class="cocktailbutton">
                            <div id="cocktaildetail" onClick="location.href ='/menu/detail/${cocktail.id}'"></div>
                        </div>
                    </div>
                </div>
            `);
        } else{
            $currentPaper.append(`
                <div class="cocktailpart">
                    <div class="explain">
                        <div class="cocktailname">${cocktail.name}</div>
                        <div class="cocktailinfo">${cocktail.info}</div>
                        <div class="cocktailprice">${cocktail.price}￦</div>
                        <div class="cocktailbutton">
                            <div id="cocktaildetail" onClick="location.href ='/menu/detail/${cocktail.id}'"></div>
                        </div>
                    </div>
                    <div class="thumbnail" style="background-image: url('${cocktail.imgUrl}')"></div> 
                </div>
            `);
        }

        count++;
    });

    if(logged_id !== -1){
        var parentDiv = document.getElementsByClassName('cocktailbutton');

        for(let div of parentDiv) {
            var newChildAddDiv = document.createElement('div');
            newChildAddDiv.id = 'cocktailadd';
            div.appendChild(newChildAddDiv);
        }
    }

    for (cocktailpart of document.querySelectorAll(".cocktailpart")) {
        cocktailpart.addEventListener("mouseenter", function(){
            this.style.backgroundColor = 'white';
            $(this).find(".cocktailbutton").css({ 'display': `flex` });
        });
        cocktailpart.addEventListener("mouseleave", function(){
            this.style.backgroundColor = 'unset';
            $(this).find(".cocktailbutton").css({ 'display': `none` });
        });
    }
    for(cocktailadd of document.querySelectorAll("#cocktailadd")){
        cocktailadd.addEventListener("click", function(e){
            e.preventDefault();
            var cocktailName = $(this).parent().siblings(".cocktailname").text();
            addToCart(menuList.find(menu => menu.name === cocktailName));
        });
    }
    // for(cocktaildetail of document.querySelectorAll("#cocktaildetail")){
    //     cocktaildetail.addEventListener("click", function(e){
    //         e.preventDefault();
    //         window.scrollTo(0, 0);
    //     });
    // }

    let fr = "";
    for(let i = 0; i < paperCount; i++)
        fr += "1fr ";
    $menuPlate.css({ 'grid-template-columns': `${fr.trim()}` });
    $('#menuscroll').css({'width': `${((paperCount + 1) * 500) + 1000}px`});

}

let isDragging = false;
let startX;
let scrollLeft;
function openMenu() {

    var menu = document.getElementById("menu");
    menu.animate({ width: `${paperCount * 500}px` },
        {
            duration: 1000, // 밀리초 지정
            fill: 'forwards', // 종료 시 속성을 지님
            easing: 'ease', // 가속도 종류
        }
    );

    // const viewport = document.querySelector('.viewport');
    const menuBody = document.querySelector('#menuBody');
    const menuscroll = document.querySelector('#menuscroll');

    const isLeftOver = () => {
        const viewportWidth = menuBody.offsetWidth;
        const viewportCenter = viewportWidth / 2;
        const targetDivRect = menuscroll.getBoundingClientRect();
        const targetLeftEdge = targetDivRect.left;

        if (targetLeftEdge > viewportCenter)
            return true;
        return false;
    };
    const isRightOver = () => {
        const viewportWidth = menuBody.offsetWidth;
        const viewportCenter = viewportWidth / 2;
        const targetDivRect = menuscroll.getBoundingClientRect();
        const targetRightEdge = targetDivRect.right;

        if (targetRightEdge < viewportCenter)
            return true;
        return false;
    };

    menuBody.addEventListener('mousedown', (e) => {
        isDragging = true;
        menuBody.style.cursor = 'grabbing';
        startX = e.pageX;// - menuscroll.offsetLeft;
        scrollLeft = menuscroll.offsetLeft;
    });

    menuBody.addEventListener('mouseleave', () => {
        isDragging = false;
        menuBody.style.cursor = 'grab';
    });

    menuBody.addEventListener('mouseup', () => {
        isDragging = false;
        menuBody.style.cursor = 'grab';
    });

    menuBody.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        e.preventDefault();
        const x = e.pageX - startX;
        let newPosition = scrollLeft + x;
        const currentPosition = menuscroll.offsetLeft;
        if(isLeftOver() && e.pageX > startX) return;
        if(isRightOver() && e.pageX < startX) return;

        menuscroll.style.left = `${newPosition}px`;
    });
}

window.addEventListener('scroll', function() {
    var decoMain = document.getElementById("decoContent");
    var leftup = document.getElementById("leftup");
    var rightup = document.getElementById("rightup");
    var leftdown = document.getElementById("leftdown");
    var rightdown = document.getElementById("rightdown");
    var cutomerButtons = document.getElementById("rightsection");
    const scrollPosition = window.scrollY;

    if (scrollPosition < 200) {
        decoMain.style.position = 'absolute';
        decoMain.style.top = 200 + 'px';
    } else {
        decoMain.style.position = 'fixed';
        decoMain.style.top = '0px';
    }

    if (scrollPosition > 200) {
        leftup.style.left = '-33%';
        rightup.style.right = '-28%';
        leftdown.style.left = '-33%';
        rightdown.style.right = '-28%';
        if(cutomerButtons) {
            cutomerButtons.style.bottom = '5%';
            // $('#cutomerButtons').animate({bottom: '5%'}, 100);
        }
    } else {
        leftup.style.left = '0%';
        rightup.style.right = '0%';
        leftdown.style.left = '0%';
        rightdown.style.right = '0%';
        if(cutomerButtons) {
            cutomerButtons.style.bottom = '-40%';
            // $('#cutomerButtons').animate({bottom: '-20%'}, 100);
            hideCartBox();
            hideChatBox();
        }
    }
});


