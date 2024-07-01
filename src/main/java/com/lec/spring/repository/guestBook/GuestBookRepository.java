package com.lec.spring.repository.guestBook;

import com.lec.spring.domain.guestBook.GuestBook;

import java.util.List;

public interface GuestBookRepository {

    // 방명록 작성
    int insertByGuestBook(GuestBook guestBook);

    // 모든 방명록 불러오기
    List<GuestBook> contentAll();

    // 해당 id 방명록 조회
//    GuestBook findById(Long id);

    // 해당 id 방명록 수정
    int updateById(GuestBook guestBook);

    // 최대 Z좌표 가진 방명록 조회
    Long findMaxZ();

    // 방명록 삭제
    int deleteByPostIt(Long id);

}
