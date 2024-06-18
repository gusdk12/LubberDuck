package com.lec.spring.service;

import com.lec.spring.config.PrincipalDetails;
import com.lec.spring.domain.Authority;
import com.lec.spring.domain.User;
import com.lec.spring.repository.AuthorityRepository;
import com.lec.spring.repository.UserRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.beans.Transient;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

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
    public User findById(Long user_id) {
        return userRepository.findById(user_id);
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

    @Override
    public int update(User user) {

        // 현재 로그인한 유저
        PrincipalDetails userDetails  = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user1 = userDetails.getUser();
        user1 = userRepository.findById(user1.getId());
        //User user1 = userRepository.findById(user.getId());
        if (user1 != null) {
            // 예를 들어, 닉네임과 이메일만 업데이트하고자 할 때
            user1.setNickname(user.getNickname());
            user1.setEmail(user.getEmail());
            user1.setBirth_date(user.getBirth_date());
            return userRepository.update(user1);
        } else {
            // 사용자가 존재하지 않을 경우 예외 처리 또는 적절한 로직 추가
            throw new RuntimeException("사용자를 찾을 수 없습니다.");
        }
    }
}
