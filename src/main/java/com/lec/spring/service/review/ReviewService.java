package com.lec.spring.service.review;

import com.lec.spring.domain.review.Review;

import java.util.List;

public interface ReviewService {
    int write(Review review); // 글 작성

    Review detail(Long id);
    // 글 목록
    List<Review> list();

    Review selectById(Long id);

    int update(Review review);

    //특정 id글 삭제하기(DELETE)
    int deleteById(Long id);

    List<Review> findByItemId(Long item_id);
}
