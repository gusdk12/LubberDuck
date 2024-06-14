package com.lec.spring.service;

import com.lec.spring.domain.Authority;
import com.lec.spring.domain.User;
import com.lec.spring.repository.AuthorityRepository;
import com.lec.spring.repository.UserRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.beans.Transient;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    private UserRepository userRepository;
    private AuthorityRepository authorityRepository;

    @Autowired
    public UserServiceImpl(SqlSession sqlSession){
        userRepository = sqlSession.getMapper(UserRepository.class);
        authorityRepository = sqlSession.getMapper(AuthorityRepository.class);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username.toUpperCase());
    }

    @Override
    public boolean isExist(String username) {
        User user = findByUsername(username.toUpperCase());
        return user != null;
    }


    @Override
        public int register(User user) {
            user.setUsername(user.getUsername().toUpperCase());
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRegDate(LocalDateTime.now());

            Authority auth = authorityRepository.findByName("ROLE_CUSTOMER");
            user.setAuthority_id(auth.getId());
            userRepository.save(user);  // 데이터베이스에 저장 후 ID가 설정됨
            Long userId = user.getId();  // 이 시점에서 ID 값을 가져올 수 있음
//            authorityRepository.addAuthority(userId, auth.getId());  // userId를 사용하여 권한 추가
            return 1;
        }


    @Override
    public List<Authority> selectAuthoritiesById(Long id) {
        User user = userRepository.findById(id);
        return authorityRepository.findByUser(user);
    }
}
