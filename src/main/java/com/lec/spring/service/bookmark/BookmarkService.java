package com.lec.spring.service.bookmark;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.mypage.Bookmark;
import com.lec.spring.domain.mypage.QryBookmarkList;

import java.util.List;

public interface BookmarkService {

    // 특정 유저(id) 의 즐겨찾기 목록
    QryBookmarkList findByUser(Long userId);

    // 특정 유저(id)와 음료(id) 찾기
    QryResult findByUserAndMenu(Long userId, Long menuId);

    // 특정 유저(id)와 음료(id)의 comment 작성 후 추가
    QryResult add(Long userId, Long menuId, String comment);

    // 삭제
    QryResult delete(Long userId, Long menuId);
}
