package com.lec.spring.repository.recent;

import com.lec.spring.domain.recent.Recent;

import java.util.List;

public interface RecentRepository {

    // 특정 유저(id) 의 최근 본 상품 목록
    List<Recent> findByUser(Long user_id);

    // 특정 유저(id)의 특정 메뉴 정보
    Recent findByUserAndMenu(Long user_id, Long menu_id);

    // 데이터 저장하기
    int insert(Recent recent);

    // 데이터 삭제하기
    int delete(Long user_id, Long menu_id);
}
