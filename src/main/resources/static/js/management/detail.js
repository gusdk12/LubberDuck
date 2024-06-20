$(document).ready(function () {
    var preview_box = $("#preview_box");
    var btn_preview = $(".btn_preview");
    var close_btn = $(".preview_close");

    // 미리보기 버튼 누르면 창 나타남
    btn_preview.on("click", function () {
        preview_box.css("display", "block");
    });

    // 'X' 버튼 누르면 창 사라짐
    close_btn.on("click", function () {
        preview_box.css("display", "none");
    });

    // 창 바깥을 클릭하면 창 사라짐
    $(window).on("click", function (event) {
        if ($(event.target).is(preview_box)) {
            preview_box.css("display", "none");
        }
    });

    // 미리보기에 작성한 내용 업데이트
    // 수정된 가격
    $('#ch_price').on('input', function () {
        let newPrice = $(this).val();    // 입력된 가격 가져오기
        $('#price').text(newPrice + '￦'); // 새로 수정된 가격 업데이트

    });

    // 수정된 소개내용
    $('#ch_info').on('input', function () {
        let newInfo = $(this).val();    // 입력된 내용 가져오기
        $('#info').text(newInfo);    // 내용 업데이트
    });
});