$(document).ready(function() {
    $('#selectAll').change(function() {
        $('.list_checkbox').prop('checked', $(this).prop('checked'));
    });

    $('.list_checkbox').change(function() {
        // 모든 체크박스가 체크된 상태인지 확인
        if ($('.list_checkbox:checked').length == $('.list_checkbox').length) {
            $('#selectAll').prop('checked', true);
        } else {
            $('#selectAll').prop('checked', false);
        }
    });

    $('#menu_selectAll').change(function() {
        $('.menu_checkbox').prop('checked', $(this).prop('checked'));
    });

    $('.menu_checkbox').change(function() {
        // 모든 체크박스가 체크된 상태인지 확인
        if ($('.menu_checkbox:checked').length == $('.menu_checkbox').length) {
            $('#menu_selectAll').prop('checked', true);
        } else {
            $('#menu_selectAll').prop('checked', false);
        }
    });
});

