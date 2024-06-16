package com.lec.spring.repository.mypage;

import com.lec.spring.domain.mypage.Bookmark;

import java.util.List;

public interface BookmarkRepository {

    // 특정 유저(id) 의 즐겨찾기 목록
    List<Bookmark> findByUser(Long user_id);
}
