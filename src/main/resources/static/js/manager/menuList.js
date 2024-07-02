$(document).ready(function () {
    $("#menunav").show();

    // 메뉴 모음집 체크박스 옵션
    $('#selectAll').change(function () {
        $('.list_checkbox').prop('checked', $(this).prop('checked'));
    });
    $('.list_checkbox').change(function () {
        // 모든 체크박스가 체크된 상태인지 확인
        if ($('.list_checkbox:checked').length === $('.list_checkbox').length) {
            $('#selectAll').prop('checked', true);
        } else {
            $('#selectAll').prop('checked', false);
        }
    });

    // 손님용 메뉴판 체크박스 옵션
    $('#menu_selectAll').change(function () {
        $('.menu_checkbox').prop('checked', $(this).prop('checked'));
    });
    $('.menu_checkbox').change(function () {
        // 모든 체크박스가 체크된 상태인지 확인
        if ($('.menu_checkbox:checked').length === $('.menu_checkbox').length) {
            $('#menu_selectAll').prop('checked', true);
        } else {
            $('#menu_selectAll').prop('checked', false);
        }
    });

    // 메뉴 모음집에서 손님용 메뉴판에 생성 버튼 기능
    $('.btn_add').click(function () {
        let addedMenuNames = new Set();
        let duplicateDetected = false; // 알림창 중복이 발생했는지 여부를 체크하는 변수
        let nonDuplicateDetected = false; // 중복되지 않은 메뉴가 있는지 여부를 체크하는 변수

        // 현재 손님용 메뉴판의 모든 칵테일 이름 값을 Set에 추가
        $('#menuList .item a').each(function () {
            addedMenuNames.add($(this).text().trim());
        });

        // 최대 sequence 값을 찾기 위해 손님용 메뉴판의 모든 sequence 값 가져오기
        let maxSequence = 0;
        $('.menuTable .sequence').each(function () {
            let sequence = parseInt($(this).text().trim());
            if (!isNaN(sequence) && sequence > maxSequence) {
                maxSequence = sequence;
            }
        });

        // .list_checkbox 가 체크된 항목들을 찾아서 각각의 sequence 값을 최대값보다 1씩 증가
        $('.list_checkbox:checked').each(function () {
            const menuName = $(this).closest('tr').find('.ctt_name').text().trim();
            let menuSequence = parseInt($(this).attr('value'));

            // 이미 추가된 메뉴인지 중복 검사
            if (addedMenuNames.has(menuName)) {
                duplicateDetected = true; // 중복 발생 체크 변수 설정
                $(this).prop('checked', false); // 생성 후, 체크박스 해제
                $('#selectAll').prop('checked', false); // 생성 후, 체크박스 해제
            } else {
                nonDuplicateDetected = true;
                if (!isNaN(menuSequence)) {
                    // 최대값보다 1 증가한 값으로 변경
                    menuSequence = maxSequence + 1;
                    maxSequence++;
                    // 해당하는 메뉴 판의 sequence 값을 업데이트
                    $(this).attr('value', menuSequence);

                    // 손님용 메뉴판에 새 메뉴 목록 추가
                    const itemName = $(this).closest('tr').find('.ctt_name').text().trim(); // 칵테일 이름 가져오기
                    const menuId = parseInt($(this).closest('tr').find('.ctt_name').attr('value')); // 칵테일 id 가져오기
                    let newRow = '<tr>' +
                        '<td class="sequence">' + menuSequence + '</td>' +
                        '<td class="item"><a class="itemName" href="/manager/menudetail/' + menuId + '">' + itemName + '</a></td>' +
                        '<td class="checkbox chg">' +
                        '<input type="checkbox" id="' + menuSequence + '" class="menu_checkbox custom-checkbox" value="' + menuSequence + '">' +
                        '<label for="' + menuSequence + '" class="custom-label"></label>' +
                        '</td>' +
                        '</tr>';

                    $('#menuList tbody').append(newRow); // #menuList 테이블에 새로운 행 추가
                    addedMenuNames.add(itemName); // 추가된 메뉴 이름을 Set에 추가
                    console.log(menuSequence)
                    $(this).prop('checked', false); // 생성 후, 체크박스 해제
                    $('#selectAll').prop('checked', false); // 생성 후, 체크박스 해제

                    // 바뀐 sequence 에 맞게 새로 정렬
                    let rows = $('#menuList tbody tr').get();
                    rows.sort((a, b) => {
                        const A = parseInt($(a).find('.sequence').text());
                        const B = parseInt($(b).find('.sequence').text());
                        return A - B;
                    });
                    // 화면에 새로운 정렬 업데이트
                    $('#menuList tbody').empty();
                    $.each(rows, function (index, row) {
                        $('#menuList tbody').append(row);
                        // 변경 중 정보조회 링크 이벤트 방지
                        $('#menuList .item a.itemName').off('click').on('click', function (event) {
                            event.preventDefault();
                        });
                    });
                }
            }
        });
        // 알림 표시
        if (nonDuplicateDetected && duplicateDetected) {
            swal("새로운 메뉴 생성!", "중복된 메뉴는 생성되지 않습니다", "success");
        } else if (nonDuplicateDetected) {
            swal("새로운 메뉴 생성!", "메뉴가 생성되었습니다", "success");
        } else if (duplicateDetected) {
            swal("메뉴 생성 실패!", "중복된 메뉴는 생성되지 않습니다", "error");
        }


    }); // end $('.btn_add').click()

    // 화살표 버튼으로 순서 바꾸기
    $('.btn_down').click(function () {
        // 체크된 체크박스들을 배열로 수집
        let checkedBoxes = $('.menu_checkbox:checked').toArray();
        // 체크된 체크박스들을 순서대로 처리
        checkedBoxes.forEach(function (checkbox) {
            let $checkbox = $(checkbox);
            let currentSequence = parseInt($checkbox.attr('value')); // 체크된 칵테일 sequence
            let $nextCheckbox = $checkbox.closest('tr').next().find('.menu_checkbox');
            let nextBoxSequence = parseInt($nextCheckbox.attr('value')); // 체크된 칵테일 밑의 sequence

            // 체크된 칵테일 밑에 칵테일이 있을 경우 (마지막 순서의 칵테일인 경우, sequence 변화 없음)
            if ($nextCheckbox.length > 0) {
                if (!isNaN(currentSequence) && !isNaN(nextBoxSequence)) {
                    // 선택된 체크박스 sequence 변경
                    $checkbox.attr('value', nextBoxSequence);
                    $checkbox.closest('tr').find('.sequence').text(nextBoxSequence);
                    // 선택된 체크박스 다음 순서의 sequence 변경
                    $nextCheckbox.attr('value', currentSequence);
                    $nextCheckbox.closest('tr').find('.sequence').text(currentSequence);
                }
            }
        });
        // 바뀐 sequence 에 맞게 새로 정렬
        let rows = $('#menuList tbody tr').get();
        rows.sort((a, b) => {
            const A = parseInt($(a).find('.sequence').text());
            const B = parseInt($(b).find('.sequence').text());
            return A - B;
        });
        // 화면에 새로운 정렬 업데이트
        $('#menuList tbody').empty();
        $.each(rows, function (index, row) {
            $('#menuList tbody').append(row);
            // 변경 중 정보조회 링크 이벤트 방지
            $('#menuList .item a.itemName').off('click').on('click', function (event) {
                event.preventDefault();
            });
        });
    }); // end $('.btn_down').click()

    $('.btn_up').click(function () {
        // 체크된 체크박스들을 배열로 수집
        let checkedBoxes = $('.menu_checkbox:checked').toArray();
        // 체크된 체크박스들을 역순으로 처리
        checkedBoxes.reverse().forEach(function (checkbox) {
            let $checkbox = $(checkbox);
            let currentSequence = parseInt($checkbox.attr('value')); // 체크된 칵테일 sequence
            let $prevCheckbox = $checkbox.closest('tr').prev().find('.menu_checkbox');
            let prevBoxSequence = parseInt($prevCheckbox.attr('value')); // 체크된 칵테일 전의 sequence

            // 체크된 칵테일 위에 칵테일이 있을 경우 (첫번째 순서의 칵테일인 경우, sequence 변화 없음)
            if ($prevCheckbox.length > 0) {
                if (!isNaN(currentSequence) && !isNaN(prevBoxSequence)) {
                    // 선택된 체크박스 sequence 변경
                    $checkbox.attr('value', prevBoxSequence);
                    $checkbox.closest('tr').find('.sequence').text(prevBoxSequence);
                    // 선택된 체크박스 이전 순서의 sequence 변경
                    $prevCheckbox.attr('value', currentSequence);
                    $prevCheckbox.closest('tr').find('.sequence').text(currentSequence);
                }
            }
        });
        // 바뀐 sequence 에 맞게 새로 정렬
        let rows = $('#menuList tbody tr').get();
        rows.sort((a, b) => {
            const A = parseInt($(a).find('.sequence').text());
            const B = parseInt($(b).find('.sequence').text());
            return A - B;
        });
        // 화면에 새로운 정렬 업데이트
        $('#menuList tbody').empty();
        $.each(rows, function (index, row) {
            $('#menuList tbody').append(row);
            // 변경 중 정보조회 링크 이벤트 방지
            $('#menuList .item a.itemName').off('click').on('click', function (event) {
                event.preventDefault();
            });
        });
    }); // end $('btn_up').click()

    // 손님용 메뉴판에서 메뉴 삭제
    let saveMenu = [];  // 변경되는 메뉴 id의 sequence 담기
    $('.btn_del').click(function () {
        // 체크된 .menu_checkbox 의 sequence 값을 -1로 변경
        $('.menu_checkbox:checked').each(function () {
            let currentSequence = parseInt($(this).attr('value'));
            let href = $(this).closest('tr').find('.itemName').attr('href');
            let menuId = parseInt(href.substring(href.lastIndexOf('/') + 1));
            if (!isNaN(currentSequence)) {
                // sequence -1로 변경
                $(this).attr('value', -1);
                saveMenu.push({id: menuId, sequence: -1});  // 배열에 id, sequence 값 담기
                // -1로 변한 sequence 행 삭제
                $(this).closest('tr').remove();
                $('#menu_selectAll').prop('checked', false); // 생성 후, 체크박스 해제

                // -1로 변경된 sequence 이후의 다른 항목들의 sequence 를 1씩 감소
                $('.menu_checkbox').each(function () {
                    let otherSequence = parseInt($(this).attr('value'));
                    if (!isNaN(otherSequence) && otherSequence > currentSequence) {
                        $(this).attr('value', otherSequence - 1);
                        // 테이블에서 보이는 순서 변경
                        let sequenceText = $(this).closest('tr').find('.sequence');
                        sequenceText.text(otherSequence - 1);
                    }
                });
                // 변경 중 정보조회 링크 이벤트 방지
                $('#menuList .item a.itemName').off('click').on('click', function (event) {
                    event.preventDefault();
                });
            }
        });
    }); // end $('.btn_del').click()

    // 모든 메뉴 데이터 저장
    $('.btn_save').click(function (event) {
        // 메뉴판에서 각 id의 sequence 모두 모으기
        $('.menu_checkbox').each(function () {
            let saveSequence = parseInt($(this).attr('value'));
            let href = $(this).closest('tr').find('.itemName').attr('href');
            let menuId = parseInt(href.substring(href.lastIndexOf('/') + 1));
            saveMenu.push({id: menuId, sequence: saveSequence});
        });

        // 변경된 sequence 서버에 보내기
        $.ajax({
            url: '/menumanager/updateAll',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(saveMenu),
            success: function (response) {
                swal("메뉴 구성 완료!", "메뉴가 새롭게 구성되었습니다", "success");
            },
            error: function (error) {
                swal("메뉴 구성 실패!", "메뉴 저장이 실패되었습니다", "error");
            }
        });

        $('#menu_selectAll, .menu_checkbox').prop('checked', false); // 생성 후, 체크박스 해제
        // 저장 후 정보조회 링크 이벤트 해제
        $('#menuList .item a.itemName').off('click');
    }); // end $('.btn_save).click()

});  // end ready()

