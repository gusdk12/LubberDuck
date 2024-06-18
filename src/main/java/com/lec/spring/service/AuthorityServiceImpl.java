package com.lec.spring.service;

import com.lec.spring.domain.Authority;
import com.lec.spring.domain.User;
import com.lec.spring.repository.AuthorityRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorityServiceImpl implements AuthorityService {

    private AuthorityRepository authorityRepository;

    @Autowired
    public AuthorityServiceImpl(SqlSession sqlSession){
        authorityRepository = sqlSession.getMapper(AuthorityRepository.class);
    }

    @Override
    public Authority getAuthorityByName(String name) {
        return authorityRepository.findByName(name);
    }

    @Override
    public List<Authority> getAuthoritiesByUser(User user) {
        return authorityRepository.findByUser(user);
    }

    @Override
    public void addAuthorityToUser(Long userId, Long authorityId) {
        authorityRepository.addAuthority(userId, authorityId);
    }
}
