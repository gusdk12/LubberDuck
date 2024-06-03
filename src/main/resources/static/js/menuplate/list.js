
window.addEventListener('load', () => {

    scrollToCenter();
    appendMenuToPlate();

});

function scrollToCenter(){
    const menuBody = document.querySelector('#menuBody');
    const menuscroll = document.querySelector('#menuscroll');

    menuBody.scrollLeft = (menuscroll.offsetWidth / 2) - 650;

    menuBody.addEventListener('wheel', (event) => {
        event.preventDefault();
        const delta = event.deltaY || event.detail || event.wheelDelta;
        menuBody.scrollLeft += (delta * 4);
    });
}

function appendMenuToPlate(){
    let count = 0;
    let paperCount = 0;
    let $menuPlate = $('.menu');
    let $currentPaper = null;

    menuList.forEach(cocktail => {
        if(count % 4 == 0){
            paperCount++;

            (paperCount % 2 == 0) && $menuPlate.append(`<div class="paperLeft" id=paper${paperCount}></div>`);
            (paperCount % 2 == 1) && $menuPlate.append(`<div class="paperRight" id=paper${paperCount}></div>`);
            $currentPaper = $(`#paper${paperCount}`);
        }

        if(count % 2 == 0) {
            $currentPaper.append(`
                <div class="cocktailpart">
                    <div class="thumbnail" style="background-image: url('${cocktail.imgUrl}')"></div>
                    <div class="explain">
                        <div class="cocktailname">${cocktail.name}</div>
                        <div class="cocktailinfo">${cocktail.info}</div>
                    </div>
                </div>
            `);
        } else{
            $currentPaper.append(`
                <div class="cocktailpart">
                    <div class="explain">
                        <div class="cocktailname">${cocktail.name}</div>
                        <div class="cocktailinfo">${cocktail.info}</div>
                    </div>
                    <div class="thumbnail" style="background-image: url('${cocktail.imgUrl}')"></div> 
                </div>
            `);
        }

        $(".cocktailpart").mouseenter(function(){
            this.style.backgroundColor = 'white';
        });
        $(".cocktailpart").mouseleave(function(){
            this.style.backgroundColor = 'unset';
        });

        count++;
    });
}

function openMenu() {
    var menu = document.getElementById("menu");
    menu.animate({ width: '2000px' },
        {
            duration: 1000, // 밀리초 지정
            fill: 'forwards', // 종료 시 속성을 지님
            easing: 'ease', // 가속도 종류
        }
    );
}

window.addEventListener('scroll', function() {
    var leftup = document.getElementById("leftup");
    var rightup = document.getElementById("rightup");
    var leftdown = document.getElementById("leftdown");
    var rightdown = document.getElementById("rightdown");
    const scrollPosition = window.scrollY;

    if (scrollPosition > 0) {
        leftup.style.left = '-30%';
        rightup.style.right = '-25%';
        leftdown.style.left = '-30%';
        rightdown.style.right = '-25%';
    } else {
        leftup.style.left = '0%';
        rightup.style.right = '0%';
        leftdown.style.left = '0%';
        rightdown.style.right = '0%';
    }
});

