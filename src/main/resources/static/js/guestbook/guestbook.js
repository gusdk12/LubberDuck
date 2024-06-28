
window.addEventListener('load', () => {
    initBoardDragEvent();
    initPostItCreateEvent();
});

function initBoardDragEvent() {
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;
    //const allcontainer = document.querySelector('#allcontainer');

    document.addEventListener('contextmenu', function(e) {
        e.preventDefault(); // Prevent the default context menu from appearing
    });

    document.addEventListener('mousedown', function(e) {
        if (e.button === 2) { // Right mouse button
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            scrollLeft = window.scrollX;
            scrollTop = window.scrollY;
            document.body.style.cursor = 'grabbing';
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            // if(scrollTop - dy > 0)
            //     return;

            window.scrollTo(scrollLeft - dx, scrollTop - dy);
            // allcontainer.style.left = `${scrollLeft - dx}px`;
            // allcontainer.style.top = `${scrollTop - dy}px`;
            // console.log("left " + (scrollLeft - dx));
            // console.log("top " + (scrollTop - dy));
        }
    });

    document.addEventListener('mouseup', function(e) {
        if (isDragging) {
            isDragging = false;
            document.body.style.cursor = 'grab';
        }
    });
}
function initPostItCreateEvent(){
    const draggableList = document.querySelectorAll('.createpostIt');
    const dropzone = document.querySelector('#guestbook');
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

                let newLeft = (pageX - offsetX) - dropzoneRect.left - window.scrollX;
                let newTop = (pageY - offsetY) - dropzoneRect.top - window.scrollY;

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

                console.log("x-coordinate : " + newDiv.offsetLeft);
                console.log("y-coordinate : " + newDiv.offsetTop);
                console.log("z-coordinate : " + 1);
            };
        });
    }
}