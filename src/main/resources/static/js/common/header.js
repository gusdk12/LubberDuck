$(document).ready(function () {
    $("#menunav").hide();
    $("#drop_manager, #drop_customer").hide();
    // 햄버거 토글버튼
    $(function () {
        $("#headermenu").click(function () {
            $("#drop_manager, #drop_customer").slideToggle();
        });
    });
}); // end ready()

