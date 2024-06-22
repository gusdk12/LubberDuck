$(document).ready(function () {
    $("#manunav").hide();
// 햄버거 토글버튼
    $(function () {
        $("#headermenu").click(function () {
            $("#manunav").slideToggle();
        });
    });
}); // end ready()

