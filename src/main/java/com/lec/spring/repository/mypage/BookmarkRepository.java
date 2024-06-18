package com.lec.spring.repository.mypage;

import com.lec.spring.domain.mypage.Bookmark;

import java.awt.print.Book;
import java.util.List;

public interface BookmarkRepository {

    // 특정 유저(id) 의 즐겨찾기 목록
    List<Bookmark> findByUser(Long user_id);

    Bookmark findByUserAndMenu(Long user_id, Long menu_id);

    int insert(Bookmark bookmark);

    int delete(Long user_id, Long menu_id);
}
