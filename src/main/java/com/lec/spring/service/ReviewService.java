package com.lec.spring.service;

import com.lec.spring.domain.Authority;
import com.lec.spring.domain.Review;
import com.lec.spring.domain.User;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ReviewService {
    int write(Review review);

    Review detail(Long id);
    // 글 목록
    List<Review> list();

    Review selectById(Long id);

    int update(Review review);

    //특정 id글 삭제하기(DELETE)
    int deleteById(Long id);
}
