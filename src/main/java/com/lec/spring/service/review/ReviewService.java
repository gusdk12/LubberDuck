package com.lec.spring.service.review;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.review.Review;

import java.time.LocalDateTime;
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

    List<Review> findByItemId(Long item_id);
//
//    QryResult write(Long itemId, int rate, String content, LocalDateTime regdate);
}
