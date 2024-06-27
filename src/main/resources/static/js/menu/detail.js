
window.addEventListener('load', async () => {
    try {
        loadMenu();
        addEvent();

        if (logged_id !== -1) {
            await checkToRecent(currentCocktail);
            await loadRecent(logged_id);
        }
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});
window.addEventListener('popstate', function (event) {
    // This code runs when the back button is clicked
    alert('popstate event triggered');
    location.reload(); // Refresh the page
});

document.addEventListener("DOMContentLoaded", function() {
    const recentSectionCon = document.getElementById("recentSection-con");

    window.addEventListener("scroll", function() {
        // Get the current scroll position
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        // Set the top position of the element
        recentSectionCon.style.top = scrollTop + "px";
    });
});

async function loadMenu() {
    $('#img').css({'background-image': `url('${menu.imgUrl}')`});
    document.querySelector(`#name`).textContent = `${menu.name}`;
    document.querySelector(`#info`).textContent = `${menu.info}`;
    document.querySelector(`#price`).textContent = `${menu.price} ￦`;
    // var cocktailName = `${menu.name}`;

    // 로그인 상태일때만 불러오기
    if (logged_id !== -1) {
        const isBookmarked = await checkBook(menu);

        // 즐겨찾기 존재여부에 따른 클래스 설정
        isBookmarked && switchToFullHeart(); // 참
        isBookmarked || switchToEmptyHeart(); // 거짓
    }
}

function addEvent(){

    // Hide the comment-con when clicking outside of it
    $(document).click(function(event) {
        if (!$(event.target).closest('.comment-con').length && !$(event.target).closest('#heartImg').length) {
            $('.comment-con').css('display', 'none');
            $("#heart").css('display','block');
        }
    });

    // addToCart
    $('#toCart').click(function(){
        var cocktailName = $(this).parent().siblings("#name").text();
        addToCart(menuList.find(menu => menu.name === cocktailName));
    });

   // swtichHeartIcon
    $('#heart').click(function(event) {
        if(event.target.className === "fullHeart"){
            event.stopPropagation();
            var cocktailName = $(this).closest('#cocktailsection').find('#name').text();
            deleteFromBook(menuList.find(menu => menu.name === cocktailName));
            swal("DELETE",cocktailName+'가 즐겨찾기에서 삭제되었습니다.',"success");

            switchToEmptyHeart();
        } else if(event.target.className === "emptyHeart"){
            event.stopPropagation();
            openComment();
            $("#heart").css('display','none');
        }
    });

    // addToBook
    $('#commentCheck').click(function() {
        var cocktailName = $(this).closest('#cocktailsection').find('#name').text();
        var commentValue = $(this).closest('#cocktailsection').find('.comment').val();
        var errorMessage = $(this).closest('#cocktailsection').find('.comment-error-message');

        // 글자 수 체크
        var maxLength = 30;
        if (commentValue.length > maxLength) {
            var currentLength = commentValue.length;
            var message = '코멘트는 30자까지 작성 가능합니다. (현재 ' + currentLength + '글자)';
            errorMessage.text(message);
            errorMessage.css('display','block');
            return; // 글자 수가 넘어가면 함수 종료
        } else {
            errorMessage.css('display', 'none');
        }

        addToBook(menuList.find(menu => menu.name === cocktailName), commentValue);
        swal("SUCCESS", "즐겨찾기에 추가되었습니다", "success");
        $("#heart").css('display', 'block');

        switchToFullHeart();
        closeComment();
    });
}

function switchToFullHeart() {
    $('#container').find('#heart').removeClass('emptyHeart').removeClass('fullHeart').addClass('fullHeart');
}

function switchToEmptyHeart() {
    $('#container').find('#heart').removeClass('emptyHeart').removeClass('fullHeart').addClass('emptyHeart');
}

// 코멘트창 열기
function openComment() {
    $('.comment-con').css('display', 'block');
    $('.comment').css('height', '200px');
}

// 코멘트창 닫기
function closeComment() {
    $('#container').find(".comment").val('');
    $('.comment-con').css('display', 'none');
    $('.comment').css('height', '0px');
}



function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// $(document).ready(function () {

// });