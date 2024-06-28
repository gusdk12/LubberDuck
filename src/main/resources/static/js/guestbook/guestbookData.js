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

                // guestBookSize = data.count();
                buildGuestBookData(data);
            }
        }
    })
}

// 읽은 데이터를 토대로 포스트잇들 하나하나 그려넣기
function buildGuestBookData(guestBook) {
    const dropzone = document.querySelector('#guestbook');

    guestBook.data.forEach(memo => {
        // $('#guestbook').append(`
        //     <div class="postIt" id="postIt${memo.postItKind}">
        //         <div class="postItContent">
        //             <div class="nickname">${memo.nickname}</div>
        //             <div class="content">${memo.content}</div>
        //         </div>
        //     </div>
        // `);
        const newDiv = document.createElement('div');
        dropzone.appendChild(newDiv);

        newDiv.className = 'postIt';
        newDiv.id = `postIt${memo.postItKind}`;
        newDiv.style.position = 'absolute';
        newDiv.style.left = `${memo.x_coordinate}px`;
        newDiv.style.top = `${memo.y_coordinate}px`;
        newDiv.style.zIndex = `${memo.z_coordinate}`;

        const memoBox = document.createElement('div');
        memoBox.className = 'postItContent';
        newDiv.appendChild(memoBox);

        const username = document.createElement('div');
        username.className = 'nickname';
        username.textContent = `${memo.nickname}`;
        memoBox.appendChild(username);

        const contentBox = document.createElement('div');
        contentBox.className = 'content';
        console.log(memo.content);
        contentBox.textContent = memo.content;

        memoBox.appendChild(contentBox);




    });

}