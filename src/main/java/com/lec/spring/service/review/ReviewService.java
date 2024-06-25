package com.lec.spring.service.review;

import com.lec.spring.domain.review.QryReviewList;
import com.lec.spring.domain.review.Review;
import org.springframework.ui.Model;

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

    QryReviewList findByItemMenu(Long menu_id);
    QryReviewList findByItemMenuPaging(Long menu_id, Integer page);

    int countAll(Long menu_id);

    public List<Review> findByUserId(Long userId);

//    페이징 리스트
    List<Review> list(Integer page, Model model);

    List<Review> detailList(Integer page, Model model);
}
