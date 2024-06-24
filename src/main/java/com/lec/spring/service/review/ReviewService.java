package com.lec.spring.service.review;

import com.lec.spring.domain.review.Review;

import java.util.List;

public interface ReviewService {
    int write(Long item_id, Integer rate, String comment); // 글 작성

    Review detail(Long id);
    // 글 목록
    List<Review> list();

    Review selectById(Long id);

    int update(Review review);

    //특정 id글 삭제하기(DELETE)
    int deleteById(Long id);

    Review findByItemId(Long item_id);

    List<Review> findByItemMenu(Long menu_id);

    public List<Review> findByUserId(Long userId);

    int countAll(Long menu_id);
}
