// 저장되어있는 데이터들 읽기
let guestBookSize = 0;

function loadGuestBookData() {
    $.ajax({
        url: "/guestbook/list",
        type: "GET",
        cache: false,
        success: function (data, status) {
            if (status === "success") {
                // 서버쪽 에러 메세지 있는 경우
                if (data.status !== "OK") {
                    alert(data.status);
                    return;
                }
                guestBookSize = data.count;
                buildGuestBookData(data);
            }
        }
    })
}   // end loadGuestBookData()

// 읽은 데이터를 토대로 포스트잇들 하나하나 그려넣기
function buildGuestBookData(guestBook) {

    const dropzone = document.querySelector('#guestbook');
    $('#guestbook').empty();

    guestBook.data.forEach(memo => {
        const newDiv = document.createElement('div');
        dropzone.appendChild(newDiv);

        newDiv.className = 'postIt';    // 클래스 이름
        newDiv.id = `postIt${memo.postItKind}`; // 포스트잇 색깔
        newDiv.style.position = 'absolute';
        newDiv.style.left = `${memo.x_coordinate}px`;   // x좌표
        newDiv.style.top = `${memo.y_coordinate}px`;    // y좌표
        newDiv.style.zIndex = `${memo.z_coordinate}`;   // z-index
        newDiv.dataset.memoId = `${memo.id}`            // 방명록 id(PK)

        const delBtn = document.createElement('span');
        delBtn.className = 'postItDel'
        delBtn.textContent = 'X';
        newDiv.appendChild(delBtn);

        // 마우스 이벤트 핸들러 추가
        newDiv.addEventListener('mouseenter', () => {
            delBtn.style.display = 'block';
        });
        newDiv.addEventListener('mouseleave', () => {
            delBtn.style.display = 'none';
        });

        delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteGuestBookData(newDiv.dataset.memoId);
        });

        const memoBox = document.createElement('div');
        memoBox.className = 'postItContent';
        memoBox.style.pointerEvents = 'none';
        newDiv.appendChild(memoBox);

        const username = document.createElement('div');
        username.className = 'nickname';
        username.textContent = `${memo.nickname}`;
        username.style.pointerEvents = 'none';
        memoBox.appendChild(username);

        const contentBox = document.createElement('div');
        contentBox.className = 'content';
        contentBox.textContent = memo.content;
        contentBox.style.pointerEvents = 'none';
        memoBox.appendChild(contentBox);

        addDragEventToPostIt(POSTIT, newDiv);
    });
}   // end buildGuestBookData();

// zIndex 최댓값 받아오기
function getMaxZIndex(postItElement) {
    // AJAX 요청 보내기
    $.ajax({
        url: '/guestbook/find',
        method: 'POST',
        success: function (maxZIndex) {
            console.log('Maximum zIndex:', maxZIndex);
            postItElement.style.zIndex = maxZIndex;
        }
    });
}

// 방명록 생성하기
async function createGuestBookData(x_coordinate, y_coordinate, z_coordinate, content, postIt) {
    // 전달할 parameter 준비 (POST)
    const postItData = {
        "userId": logged_id,
        "x": x_coordinate,
        "y": y_coordinate,
        "z": z_coordinate,
        "content": content,
        "postIt": postIt
    };

    $.ajax({
        url: "/guestbook/write",
        type: "POST",
        cache: false,
        data: postItData,
        success(postItData, status) {
            if (status === "success") {
                if (postItData.status !== "OK") {
                    alert(postItData.status);
                }
                loadGuestBookData();
            }
        }
    });
}   // end crateGuestBookData()

// 방명록 위치 수정
async function updateGuestBookData(memoId, x_coordinate, y_coordinate, z_coordinate) {
    // 전달할 parameter 준비 (POST)
    const postItData = {
        "memoId": memoId,
        "userId": logged_id,
        "x": x_coordinate,
        "y": y_coordinate,
        "z": z_coordinate
    };

    $.ajax({
        url: "/guestbook/update",
        type: "POST",
        cache: false,
        data: postItData,
        success(postItData, status) {
            if (status === "success") {
                loadGuestBookData();
            }
        }
    })
}

// 방명록 삭제
async function deleteGuestBookData(memoId) {
    const postItData = {
        "memoId": memoId
    };

    $.ajax({
        url: "/guestbook/delete",
        type: "POST",
        cache: false,
        data: postItData,
        success(postItData, status) {
            if (status === "success") {
                if (postItData.status !== "OK") {
                    alert(postItData.status);
                }
                loadGuestBookData();
            }
        }
    })
}