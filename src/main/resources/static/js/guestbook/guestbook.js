const CREATEPOSTIT = 1;
const POSTIT = 2;

window.addEventListener('load', () => {
    $("#menunav").show();

    initBoardDragEvent();
    initPostItCreateEvent();

    loadGuestBookData();
});

function initBoardDragEvent(postItType, element) {

    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;
    const guestbookcontainer = document.querySelector('#guestbooksection');

    document.addEventListener('contextmenu', function (e) {
        e.preventDefault(); // Prevent the default context menu from appearing
    });

    document.addEventListener('mousedown', function (e) {
        if (e.button === 2) { // Right mouse button
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            scrollLeft = window.scrollX;
            scrollTop = window.scrollY;
            document.body.style.cursor = 'grabbing';
        }
    });

    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            // if(scrollTop - dy > 0)
            //     return;

            window.scrollTo(scrollLeft - dx, scrollTop - dy);

            // if(scrollLeft - dx < 0){
            //     guestbookcontainer.style.left = `${guestbookcontainer.offsetLeft - (scrollLeft - dx)}px`;
            //     console.log(guestbookcontainer.offsetLeft);
            // } else {
            //     guestbookcontainer.style.left = `0px`;
            // }
            // allcontainer.style.left = `${scrollLeft - dx}px`;
            // allcontainer.style.top = `${scrollTop - dy}px`;
            // console.log("left " + (scrollLeft - dx));
            // console.log("top " + (scrollTop - dy));
        }
    });

    document.addEventListener('mouseup', function (e) {
        if (isDragging) {
            isDragging = false;
            document.body.style.cursor = 'grab';
        }
    });
}

function initPostItCreateEvent() {
    const draggableList = document.querySelectorAll('.createpostIt');

    for (let draggable of draggableList) {
        addDragEventToPostIt(CREATEPOSTIT, draggable);
    }
}

function addDragEventToPostIt(postItType, postItElement) {

    if (logged_id === -1) return;

    const dropzone = document.querySelector('#guestbook');
    let offsetX, offsetY;

    postItElement.addEventListener('mousedown', (e) => {
            // 부모 이벤트 막기
            if (e.target !== e.currentTarget) return;

            if (postItType === CREATEPOSTIT) {
                const newDiv = document.createElement('div');
                newDiv.className = 'postIt';
                newDiv.id = `${postItElement.getAttribute('id')}`;
                dropzone.appendChild(newDiv);
                postItElement = newDiv;

                const contentBox = document.createElement('input');
                contentBox.className = 'contentBox';
                contentBox.type = 'text';
                contentBox.placeholder = '방명록을 작성해주세요';
                newDiv.appendChild(contentBox);
            }

            postItElement.style.position = 'absolute';
            postItElement.style.zIndex = 99999999999999;
            offsetX = e.offsetX;
            offsetY = e.offsetY;
            let isMouseDown = true;

            getMaxZIndex(postItElement);
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
            document.body.onmouseup = function (e) {
                if (!isMouseDown) return;

                isMouseDown = false;

                let x_coordinate = parseFloat(postItElement.offsetLeft);
                let y_coordinate = parseFloat(postItElement.offsetTop);
                let z_coordinate = parseInt(postItElement.style.zIndex) + 1;
                let contentBox = postItElement.querySelector('.contentBox');
                let postIt = (postItElement.id).replace('postIt', '');
                let memoId = postItElement.dataset.memoId;

                if (postItType === CREATEPOSTIT) {  // postItType이 CREATEPOSTIT인 경우는,
                    // 처음에 포스트잇 종류 5개 중 클릭해서 새로운 포스트잇을 게시판에 놓은 경우.

                    contentBox.focus();
                    let isAlertShown = false;

                    // 마우스가 다른 곳을 눌렀을 때
                    postItElement.querySelector('.contentBox').addEventListener("focusout", function (event) {
                            let content = postItElement.querySelector('.contentBox').value.trim();
                            if (content === '') {
                                if (!isAlertShown) { // 알림창이 아직 표시되지 않은 경우에만 실행
                                    swal("저장 실패", "내용을 입력해주세요", "error").then((result) => {
                                        if (result || event.key === "Enter") {
                                            contentBox.focus(); // 알림창 확인 후 focus 이동
                                        }
                                    });
                                }
                            } else if (content.length > 30) {
                                swal("저장 실패", "30자 이내로 적어주세요", "error").then((result) => {
                                    if (result || event.key === "Enter") {
                                        contentBox.focus(); // 알림창 확인 후 focus 이동
                                    }
                                });
                            } else {
                                createGuestBookData(x_coordinate, y_coordinate, z_coordinate, content, postIt);
                            }
                        });

                    // 엔터키 눌렀을 때
                    postItElement.querySelector('.contentBox').addEventListener("keydown", function (event) {
                        let content = postItElement.querySelector('.contentBox').value.trim();
                        if (event.key === "Enter") {
                            event.preventDefault(); // 엔터키 기본 동작 막기

                            if (content === '') {
                                if (!isAlertShown) {
                                    swal("저장 실패", "내용을 입력해주세요", "error").then((result) => {
                                        if (result || event.key === "Enter") {
                                            contentBox.focus();
                                        }
                                    });
                                }
                            } else if (content.length > 30) {
                                swal("저장 실패", "30자 이내로 적어주세요", "error").then((result) => {
                                    if (result || event.key === "Enter") {
                                        contentBox.focus();
                                    }
                                });
                            } else {
                                // 포커스 아웃 이벤트 트리거
                                postItElement.querySelector('.contentBox').blur();
                            }
                        }
                    });
                } else if (postItType === POSTIT) {  // postItType이 POSTIT인 경우는,
                    // 이미 게시판에 붙은 포스트잇을 드래그해서, 새로운 위치에 갖다놓은 경우.
                    updateGuestBookData(memoId, x_coordinate, y_coordinate, z_coordinate);
                }
                addDragEventToPostIt(POSTIT, postItElement);
            };
        }
    )
    ;
}


