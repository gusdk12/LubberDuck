$(document).ready(function () {
    $('#selectAll').change(function () {
        $('.list_checkbox').prop('checked', $(this).prop('checked'));
    });

    $('.list_checkbox').change(function () {
        // 모든 체크박스가 체크된 상태인지 확인
        if ($('.list_checkbox:checked').length == $('.list_checkbox').length) {
            $('#selectAll').prop('checked', true);
        } else {
            $('#selectAll').prop('checked', false);
        }
    });

    $('#menu_selectAll').change(function () {
        $('.menu_checkbox').prop('checked', $(this).prop('checked'));
    });

    $('.menu_checkbox').change(function () {
        // 모든 체크박스가 체크된 상태인지 확인
        if ($('.menu_checkbox:checked').length == $('.menu_checkbox').length) {
            $('#menu_selectAll').prop('checked', true);
        } else {
            $('#menu_selectAll').prop('checked', false);
        }
    });

    // 메뉴 모음집에서 손님용 메뉴판에 생성 버튼 기능
    $('.btn_add').click(function () {
        let addedMenuNames = new Set();
        let duplicateDetected = false; // 알림창 중복이 발생했는지 여부를 체크하는 변수

        // 현재 손님용 메뉴판의 모든 칵테일 이름 값을 Set에 추가
        $('#menuList .item a').each(function () {
            addedMenuNames.add($(this).text().trim());
        });

        // 최대 sequence 값을 찾기 위해 손님용 메뉴판의 모든 sequence 값 가져오기
        var maxSequence = 0;
        $('.menuTable .sequence').each(function () {
            var sequence = parseInt($(this).text().trim());
            if (!isNaN(sequence) && sequence > maxSequence) {
                maxSequence = sequence;
            }
        });

        // .list_checkbox 가 체크된 항목들을 찾아서 각각의 sequence 값을 최대값보다 1씩 증가
        $('.list_checkbox:checked').each(function () {
            var menuName = $(this).closest('tr').find('.ctt_name').text().trim();
            var menuSequence = parseInt($(this).attr('value'));
            // 이미 추가된 메뉴인지 중복 검사
            if (addedMenuNames.has(menuName)) {
                if (!duplicateDetected) {
                    alert('메뉴가 생성되었습니다\n중복된 메뉴는 생성되지 않습니다');
                    duplicateDetected = true; // 중복 발생 체크 변수 설정
                }
                $(this).prop('checked', false); // 생성 후, 체크박스 해제
            } else {
                if (!duplicateDetected) {
                    alert('메뉴가 생성되었습니다');
                    duplicateDetected = true; // 중복 발생 체크 변수 설정
                }
                if (!isNaN(menuSequence)) {
                    // 최대값보다 1 증가한 값으로 변경
                    menuSequence = maxSequence + 1;
                    maxSequence++;
                    // 해당하는 메뉴 판의 sequence 값을 업데이트
                    $(this).attr('value', menuSequence);

                    // 손님용 메뉴판에 새 메뉴 목록 추가
                    var menuName = $(this).closest('tr').find('.ctt_name').text().trim(); // 칵테일 이름 가져오기
                    var newRow = '<tr>' +
                        '<td class="sequence">' + menuSequence + '</td>' +
                        '<td class="item"><a href="/management/detail/' + menuSequence + '">' + menuName + '</a></td>' +
                        '<td class="checkbox chg">' +
                        '<input type="checkbox" id="' + menuSequence + '" class="menu_checkbox custom-checkbox" value="' + menuSequence + '">' +
                        '<label for="' + menuSequence + '" class="custom-label"></label>' +
                        '</td>' +
                        '</tr>';

                    $('#menuList tbody').append(newRow); // #menuList 테이블에 새로운 행 추가
                    addedMenuNames.add(menuName); // 추가된 메뉴 이름을 Set에 추가
                    $(this).prop('checked', false); // 생성 후, 체크박스 해제
                }
            }
        });
    }); // end $('.btn_add').click()

    // 손님용 메뉴판에서 메뉴 삭제
    $('.btn_del').click(function () {
        if (confirm('메뉴판에서 메뉴를 삭제하시겠습니까?')) {
            // 체크된 .menu_checkbox 의 sequence 값을 -1로 변경
            $('.menu_checkbox:checked').each(function () {
                var currentSequence = parseInt($(this).attr('value'));
                if (!isNaN(currentSequence)) {
                    // sequence -1로 변경
                    $(this).attr('value', -1);
                    // -1로 변한 sequence 행 삭제
                    $(this).closest('tr').remove();

                    // -1로 변경된 sequence 이후의 다른 항목들의 sequence 를 1씩 감소
                    $('.menu_checkbox').each(function () {
                        var otherSequence = parseInt($(this).attr('value'));
                        if (!isNaN(otherSequence) && otherSequence > currentSequence) {
                            $(this).attr('value', otherSequence - 1);

                            // 테이블에서 보이는 순서 변경
                            var sequenceText = $(this).closest('tr').find('.sequence');
                            sequenceText.text(otherSequence - 1);
                        }
                    });
                }
            });
        }
    }); // end $('.btn_del').click()

    // 화살표 버튼으로 순서 바꾸기
    // $('.btn_up').click(function () {
    //     $('.menu_checkbox:checked').each(function (index) {
    //         var currentSequence = parseInt($(this).attr('value'));
    //         if (!isNaN(currentSequence)) {
    //             // 선택된 메뉴 sequence 값을 1 증가
    //             var newSequence = currentSequence + 1;
    //             $(this).attr('value', newSequence);
    //             $(this).closest('tr').find('.sequence').text(newSequence);
    //             // 다음 순서의 메뉴 sequence 값 -1 감소
    //             var nextCheckbox = $(this).closest('tr').next().find('.menu_checkbox')
    //             if (nextCheckbox.length > 0) {
    //                 nextCheckbox.attr('value', currentSequence);
    //                 nextCheckbox.closest('tr').find('.sequence').text(currentSequence);
    //             }
    //         }
    //     });
    //
    //     // 변한 sequence 에 맞게 새로 정렬
    //     var rows = $('#menuList tbody tr').get();
    //     rows.sort((a, b) => {
    //         const A = parseInt($(a).find('.sequence').text());
    //         const B = parseInt($(b).find('.sequence').text());
    //         return A - B;
    //     });
    //
    //     // 화면에 새로운 정렬 업데이트
    //     $('#menuList tbody').empty();
    //     $.each(rows, function (index, row) {
    //         $('#menuList tbody').append(row);
    //     });
    // }); // end $('.btn_up').click()

});  // end ready()

