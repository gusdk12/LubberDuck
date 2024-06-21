package com.lec.spring.service.recent;

import com.lec.spring.domain.recent.Recent;

import java.util.List;

public interface RecentService {
    List<Recent> findByUser(Long userId);
}
