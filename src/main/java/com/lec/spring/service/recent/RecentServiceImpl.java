package com.lec.spring.service.recent;

import com.lec.spring.domain.recent.Recent;
import com.lec.spring.repository.recent.RecentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecentServiceImpl implements RecentService {

    private RecentRepository recentRepository;

    @Override
    public List<Recent> findByUser(Long userId) {

        return recentRepository.findByUser(userId);
    }
}
