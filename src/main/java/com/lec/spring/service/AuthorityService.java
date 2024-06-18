package com.lec.spring.service;

import com.lec.spring.domain.Authority;
import com.lec.spring.domain.User;

import java.util.List;

public interface AuthorityService {
    Authority getAuthorityByName(String name);

    List<Authority> getAuthoritiesByUser(User user);

    void addAuthorityToUser(Long userId, Long authorityId);
}
