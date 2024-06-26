// 존재 여부에 따른 추가
async function checkToRecent(cocktail) {
    if (cocktail == null || logged_id === -1) {
        return;
    }

    // 최근 본 목록에 이미 있는지 확인하기
    let findRecent = null;

    await $.ajax({
        url: "/recentData/detail/" + logged_id + "/" + cocktail.id,
        type: "GET",
        cache: false,
        success: function (data, status) {
            if (status === "success") {
                if (data.status !== "OK") {
                    alert(data.status);
                    return;
                }
                findRecent = data.data;
            }
        },
    });

    // 최근 본 목록에 없다면 카트 추가
    if (!findRecent) {
        console.log('존재안하는 checkToRecent 호출');
        await addToRecent(cocktail);
        // deleteLimited();
    } else {
        console.log('존재하는 checkToRecent 호출');
        await deleteToRecent(cocktail);
        await addToRecent(cocktail);
    }
}

async function deleteLimited() {
    // return 키워드 : AJAX 요청의 결과를 반환하도록 함 => 각 함수 내에서 비동기 호출이 완료될 때까지 기다림
    return $.ajax({
        url: "/recentData/deleteLimit/" + logged_id, // 4개 초과 시 오래된 항목 삭제
        type: "POST",
        cache: false,
        success: function (data, status) {
            if (status !== "success" || data.status !== "OK") {
                alert(data.status);
            }
        },
    });
}

async function addToRecent(cocktail) {
    // 전달할 parameter 준비 (POST)
    const data = {
        "userId": logged_id,
        "cocktailId": cocktail.id,
    };

    return $.ajax({
        url: "/recentData/add",
        type: "POST",
        data: data,
        cache: false,
        success: function (data, status) {
            if (status === "success") {
                console.log('addToRecent 성공');
                if (data.status !== "OK") {
                    alert(data.status);
                }
            }
        },
    });
}

async function deleteToRecent(cocktail) {
    // 전달할 parameter 준비 (POST)
    const data = {
        "userId": logged_id,
        "cocktailId": cocktail.id,
    };

    return $.ajax({
        url: "/recentData/delete/" + logged_id + "/" + cocktail.id,
        type: "POST",
        data: data,
        cache: false,
        success: function (data, status) {
            if (status === "success") {
                console.log('deleteToRecent 성공');
                if (data.status !== "OK") {
                    alert(data.status);
                }
            }
        },
    });
}

function loadRecent(user_id) {
    return $.ajax({
        url: "/recentData/list/" + user_id,
        type: "GET",
        cache: false,
        success: function (data, status) {
            if (status === "success") {
                console.log('loadRecent 성공');
                // 서버쪽 에러 메세지 있는경우
                if (data.status !== "OK") {
                    alert(data.status);
                    return;
                }
                console.log('로드 중..');
                buildRecent(data);

                console.log(data.data.length);
                if (data.data.length > 4) {
                    console.log('삭제 필요');
                    deleteLimited();
                }
            }
        },
    });
}

function buildRecent(result) {
    console.log('빌드 중..');
    $('#recentSection').empty(); // 기존 항목들을 제거합니다.

    const recentItems = result.data.slice(0, 4);

    recentItems.forEach((recent, index) => {
        const isLastItem = index === recentItems.length - 1;

        $('#recentSection').append($(`
            <div class="recent-con">
                <div class="cttName"> ${recent.menu.name} </div>
                <div class="cttImg" 
                    style="background-image: url('${recent.menu.imgUrl}')"
                    onclick="location.href = '/menu/detail/${recent.menu.id}'">                    
                </div>
            </div>
            <div id="recentLine" style="display: ${isLastItem ? 'none' : 'block'};"></div>
        `));
    });
}