package com.lec.spring.service.bookmark;

import com.lec.spring.domain.mypage.Bookmark;
import com.lec.spring.domain.mypage.QryBookmarkList;

import java.util.List;

public interface BookmarkService {

    // 특정 유저(id) 의 즐겨찾기 목록
    QryBookmarkList list(Long userId);
}
