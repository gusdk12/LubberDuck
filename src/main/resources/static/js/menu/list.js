
var paperCount = 0;

window.addEventListener('load', () => {

    preloadImages();
    scrollToCenter();
    appendMenuToPlate();
    addEventCustomerButtons();

});

function preloadImages(){
    // 미리 로드할 이미지 URL 목록
    var images = [
        '/img/management/menu.jpg'
    ];

    // 각 이미지 URL을 순회하며 로드
    $.each(images, function(index, url) {
        $('<img>').attr('src', url).addClass('hidden').appendTo('body');
    });
}

function scrollToCenter(){
    const menuBody = document.querySelector('#menuBody');

    menuBody.scrollLeft = (menuBody.offsetWidth / 2) - 150;
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
                            <div id="cocktailadd"></div>
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
                            <div id="cocktailadd"></div>
                            <div id="cocktaildetail" onClick="location.href ='/menu/detail/${cocktail.id}'"></div>
                        </div>
                    </div>
                    <div class="thumbnail" style="background-image: url('${cocktail.imgUrl}')"></div> 
                </div>
            `);
        }
        count++;
    });



    for(cocktailpart of document.querySelectorAll(".cocktailpart")){
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

            var cocktailName = $(this).parent().parent().siblings("div").text();

            addToCart(menuList.find(menu => menu.name === cocktailName));
        });
    }


    let fr = "";
    for(let i = 0; i < paperCount; i++)
        fr += "1fr ";
    $menuPlate.css({ 'grid-template-columns': `${fr.trim()}` });
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

    const menuBody = document.querySelector('#menuBody');

    menuBody.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - menuBody.offsetLeft;
        scrollLeft = menuBody.scrollLeft;
    });

    menuBody.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    menuBody.addEventListener('mouseup', () => {
        isDragging = false;
    });

    menuBody.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - menuBody.offsetLeft;
        const walk = x - startX;
        menuBody.scrollLeft = scrollLeft - walk;
    });
}

window.addEventListener('scroll', function() {
    var decoMain = document.getElementById("decoContent");
    var leftup = document.getElementById("leftup");
    var rightup = document.getElementById("rightup");
    var leftdown = document.getElementById("leftdown");
    var rightdown = document.getElementById("rightdown");
    var cutomerButtons = document.getElementById("cutomerButtons");
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
        }
    } else {
        leftup.style.left = '0%';
        rightup.style.right = '0%';
        leftdown.style.left = '0%';
        rightdown.style.right = '0%';
        if(cutomerButtons) {
            cutomerButtons.style.bottom = '-20%';
            hideCartBox();
        }
    }
});


