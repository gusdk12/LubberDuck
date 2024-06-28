package com.lec.spring.service.guestBook;

import com.lec.spring.domain.guestBook.GuestBook;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface GuestBookService {

    // 방명록 작성
    int write(GuestBook guestBook);

    // 방명록 전체 조회
    List<GuestBook> postItAll();

    // 특정 id 방명록 조회 ( 및 z_coordinate 같이 수정)
    @Transactional
    GuestBook selectByPostIt(Long id);

    // 특정 id 방명록 수정
    int updateByPostIt(GuestBook guestBook);

    // 특정 id 방명록 삭제
    int deleteById(Long id);
}
