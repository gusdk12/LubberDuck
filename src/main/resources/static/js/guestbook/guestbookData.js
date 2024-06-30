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

    guestBook.data.forEach(memo => {
        const newDiv = document.createElement('div');
        dropzone.appendChild(newDiv);

        newDiv.className = 'postIt';
        newDiv.id = `postIt${memo.postItKind}`;
        newDiv.style.position = 'absolute';
        newDiv.style.left = `${memo.x_coordinate}px`;
        newDiv.style.top = `${memo.y_coordinate}px`;
        newDiv.style.zIndex = `${memo.z_coordinate}`;
        newDiv.dataset.memoId = `${memo.id}`

        const memoBox = document.createElement('div');
        memoBox.className = 'postItContent';
        newDiv.appendChild(memoBox);

        const username = document.createElement('div');
        username.className = 'nickname';
        username.textContent = `${memo.nickname}`;
        memoBox.appendChild(username);

        const contentBox = document.createElement('div');
        contentBox.className = 'content';
        contentBox.textContent = memo.content;
        memoBox.appendChild(contentBox);

        addDragEventToPostIt(POSTIT, newDiv);
    });
}   // end buildGuestBookData();

// 방명록 생성하기
async function createGuestBookData(x_coordinate, y_coordinate, content, postIt) {
    // 전달할 parameter 준비 (POST)
    const postItData = {
        "userId": logged_id,
        "x": x_coordinate,
        "y": y_coordinate,
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
            }
        }
    })
}   // end crateGuestBookData()

// 방명록 위치 수정
async function updateGuestBookData(memoId, x_coordinate, y_coordinate) {
    // 전달할 parameter 준비 (POST)
    const postItData = {
        "memoId": memoId,
        "userId": logged_id,
        "x": x_coordinate,
        "y": y_coordinate,
    };

    $.ajax({
        url: "/guestbook/update",
        type: "POST",
        cache: false,
        data: postItData,
        success(postItData, status) {
            if (status === "success") {
                if (postItData.status !== "OK") {
                    alert(postItData.status);
                }
            }
        }
    })
}