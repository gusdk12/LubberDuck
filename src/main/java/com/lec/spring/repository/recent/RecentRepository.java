package com.lec.spring.repository.recent;

import com.lec.spring.domain.recent.Recent;

import java.util.List;

public interface RecentRepository {

    // 특정 유저(id) 의 최근 본 상품 목록
    List<Recent> findByUser(Long user_id);
}
