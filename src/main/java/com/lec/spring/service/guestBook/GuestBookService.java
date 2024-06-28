package com.lec.spring.service.guestBook;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.guestBook.GuestBook;
import com.lec.spring.domain.guestBook.QryGuestBookLIst;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface GuestBookService {

    // 방명록 작성
    QryResult write (GuestBook guestBook);

    // 방명록 전체 조회
    QryGuestBookLIst postItAll();

    // 특정 id 방명록 조회 ( 및 z_coordinate 같이 수정)
    @Transactional
    QryResult selectByPostIt(Long id);

    // 특정 id 방명록 수정
    QryResult updateByPostIt(GuestBook guestBook);

    // 특정 id 방명록 삭제
    QryResult deleteById(Long id);
}
