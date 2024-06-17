var currentQuantity = 1;

window.addEventListener('load', () => {

    loadMenu();
    addEvent();

});

function loadMenu(){
    $('#img').css({'background-image': `url('${menu.imgUrl}')`});
    document.querySelector(`#name`).textContent = `${menu.name}`;
    document.querySelector(`#info`).textContent = `${menu.info}`;
    document.querySelector(`#price`).textContent = `${menu.price} ￦`;
    document.querySelector(`#nowQuantity`).textContent = `${currentQuantity}`;
}
function addEvent(){
    $('#plusQuantity').click(function(){
        currentQuantity++;
        document.querySelector(`#nowQuantity`).textContent = `${currentQuantity}`;
    });
    $('#minusQuantity').click(function(){
        if(currentQuantity == 1) return;
        currentQuantity--;
        document.querySelector(`#nowQuantity`).textContent = `${currentQuantity}`;
    });
}
