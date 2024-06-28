
const CREATEPOSTIT = 1;
const POSTIT = 2;

window.addEventListener('load', () => {
    initBoardDragEvent();
    initPostItCreateEvent();
});

function initBoardDragEvent(postItType, element) {
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

    for(let draggable of draggableList){
        addDragEventToPostIt(CREATEPOSTIT, draggable);
    }
}

function addDragEventToPostIt(postItType, postItElement){
    const dropzone = document.querySelector('#guestbook');
    let offsetX, offsetY;

    postItElement.addEventListener('mousedown', (e) => {
        if(postItType === CREATEPOSTIT){
            const newDiv = document.createElement('div');
            newDiv.className = 'postIt';
            newDiv.id = `${postItElement.getAttribute('id')}`;
            dropzone.appendChild(newDiv);
            postItElement = newDiv;
        }

        postItElement.style.position = 'absolute';
        postItElement.style.zIndex = 999999;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        let isMouseDown = true;

        moveAt(e.pageX, e.pageY);

        function moveAt(pageX, pageY) {
            const dropzoneRect = dropzone.getBoundingClientRect();

            let newLeft = (pageX - offsetX) - dropzoneRect.left - window.scrollX;
            let newTop = (pageY - offsetY) - dropzoneRect.top - window.scrollY;

            (newLeft < 0) && (newLeft = 0);
            (newLeft > (dropzoneRect.width - postItElement.offsetWidth)) && (newLeft = dropzoneRect.width - postItElement.offsetWidth);
            (newTop < 0) && (newTop = 0);
            (newTop > (dropzoneRect.height - postItElement.offsetHeight)) && (newTop = dropzoneRect.height - postItElement.offsetHeight);

            postItElement.style.left = newLeft + 'px';
            postItElement.style.top = newTop + 'px';
        }

        function onMouseMove(event) {
            isMouseDown && moveAt(event.pageX, event.pageY);
        }
        document.body.onmousemove = onMouseMove;

        document.body.onmouseup = function () {
            isMouseDown = false;
            postItElement.style.zIndex = 1; // TODO

            // console.log("x-coordinate : " + postItElement.offsetLeft);
            // console.log("y-coordinate : " + postItElement.offsetTop);
            // console.log("z-coordinate : " + 1);
            addDragEventToPostIt(POSTIT, postItElement);
        };
    });
}