package com.lec.spring.repository.guestBook;

import com.lec.spring.domain.guestBook.GuestBook;

import java.util.List;

public interface GuestBookRepository {
    // 게시글 생성
    int insertByBoard(GuestBook guestBook);

    // 모든 게시글 불러오기
    List<GuestBook> contentAll();

    // 해당 id 게시글 조회
    GuestBook findById(Long id);

    // 해당 id 게시글 수정
    int updateById(GuestBook guestBook);

    // 게시글 삭제
    int delete(GuestBook guestBook);

    // 최대 Z좌표 조회
    GuestBook findMaxZ(GuestBook guestBook);

}
