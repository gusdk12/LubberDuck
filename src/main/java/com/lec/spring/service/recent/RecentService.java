package com.lec.spring.service.recent;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.recent.QryRecentList;
import com.lec.spring.domain.recent.Recent;

import java.util.List;

public interface RecentService {

    // 특정 유저(id) 의 최근 본 목록
    QryRecentList findByUser(Long userId);

    // 특정 유저 찾기
    QryResult findByUserAndMenu(Long user_id, Long menu_id);

    // 추가
    QryResult add(Long user_id, Long menu_id);

    // 삭제
    QryResult delete(Long userId, Long menuId);
}
