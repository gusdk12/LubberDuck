
$(document).ready(function(){
    // 사이드바 메뉴 클릭시 css 변경
    $('.sm').eq(3).css({
        'background-color':'#f8e9d7',
        'border-radius' : "10px 0 0 10px",
        'color' : '#54320f',
        'font-weight': 'bold'
    });

    $(".box").hover(
        function() {
            $(this).find("#drop").css('display', 'block');
        },
        function() {
            $(this).find("#drop").css('display', 'none');
        }
    );

    $(".CI").hover(
        function() {
            $(this).find("#modify").css('display', 'block');
        },
        function() {
            $(this).find("#modify").css('display', 'none');
        }
    );

    $("#cocktail-con, .CII").hover(
        function() {
            $(".CII").css('display', 'block');
        },
        function() {
            $(".CII").css('display', 'none');
        }
    );

    $('#drop').click(function(){
        // alert('삭제하시겠습니까?');
    });

    // var randomIndex = Math.floor(Math.random() * 5+1);
    // $('#background').addClass(randomIndex);

    // 현재 유저의 id 값
    const id = $("input[name='id']").val().trim();

    // 현재 유저의 즐겨찾기들을 불러온다
    loadBook(id);
});

loadBook