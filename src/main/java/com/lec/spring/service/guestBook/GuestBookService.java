package com.lec.spring.service.guestBook;

import com.lec.spring.domain.guestBook.GuestBook;

import java.util.List;

public interface GuestBookService {
    // 게시글 작성
    int write(GuestBook board);

    // 게시글 전체 목록
    List<GuestBook> memoAll();

    // 특정 id 게시글 조회
    GuestBook selectByMemo(Long id);

    // 특정 id 게시글 수정
    int updateByMemo(GuestBook board);

    // 특정 id 게시글 삭제
    int deleteById(Long id);
}
