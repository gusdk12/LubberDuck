package com.lec.spring.service.guestBook;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.guestBook.QryGuestBookLIst;

public interface GuestBookService {

    // 방명록 작성
    QryResult write (Long user_id, Double x_coordinate, Double y_coordinate, Long z_coordinate, String content, Integer postItKind);

    // 방명록 전체 조회
    QryGuestBookLIst postItAll();

    // 최대 z_coordinate찾기
    Long maxZ_index();

    // 특정 id 방명록 수정
    QryResult updateByPostIt(Long id, Long user_id, Double x_coordinate, Double y_coordinate, Long z_coordinate);

    // 특정 id 방명록 삭제
    QryResult deleteById(Long id);
}
