package com.lec.spring.repository;

import com.lec.spring.domain.User;
import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;


@SpringBootTest
class UserRepositoryTest {

    @Autowired
    private SqlSession sqlSession;

    @Test
    void test1(){
        UserRepository userRepository = sqlSession.getMapper(UserRepository.class);
        AuthorityRepository authorityRepository = sqlSession.getMapper(AuthorityRepository.class);

        User user = userRepository.findById(1L);
        System.out.println("findById(): " + user);
        var list = authorityRepository.findByUser(user);
        System.out.println("권한들 : " + list);
    }

    @Autowired
    PasswordEncoder encoder;

    @Test
    void passwordEncoderTest(){
        String rawPassword = "1234";

        for(int i = 0; i < 10; i++){
            System.out.println(encoder.encode(rawPassword));
        }
    }
}