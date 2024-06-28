
window.addEventListener('load', () => {
    initPostItCreateEvent();
});

function initPostItCreateEvent(){
    // const draggable = document.getElementById('postIt1');
    const draggableList = document.querySelectorAll('.createpostIt');
    const dropzone = document.querySelector('#guestbook');
    let clone = null;
    let offsetX, offsetY;

    for(let draggable of draggableList) {
        draggable.addEventListener('mousedown', (e) => {
            const newDiv = document.createElement('div');
            newDiv.style.position = 'absolute';
            newDiv.style.zIndex = 999999;
            newDiv.className = 'postIt';
            newDiv.id = "postIt" + `${draggable.getAttribute('value')}`;
            dropzone.appendChild(newDiv);
            offsetX = e.offsetX;
            offsetY = e.offsetY;

            moveAt(e.pageX, e.pageY);

            function moveAt(pageX, pageY) {
                const dropzoneRect = dropzone.getBoundingClientRect();

                let newLeft = (pageX - offsetX) - dropzoneRect.left;
                let newTop = (pageY - offsetY) - dropzoneRect.top;

                (newLeft < 0) && (newLeft = 0);
                (newLeft > (dropzoneRect.width - newDiv.offsetWidth)) && (newLeft = dropzoneRect.width - newDiv.offsetWidth);
                (newTop < 0) && (newTop = 0);
                (newTop > (dropzoneRect.height - newDiv.offsetHeight)) && (newTop = dropzoneRect.height - newDiv.offsetHeight);

                newDiv.style.left = newLeft + 'px';
                newDiv.style.top = newTop + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            document.body.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                newDivonmouseup = null;
                newDiv.style.zIndex = 1; // TODO
            };
        });
    }
}