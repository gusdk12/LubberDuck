package com.lec.spring.service.review;

import com.lec.spring.domain.review.Review;
import com.lec.spring.repository.review.ReviewRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {
    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewServiceImpl(SqlSession sqlSession){
        reviewRepository = sqlSession.getMapper(ReviewRepository.class);
    }

    @Override
    public int write(Long item_id, Integer rate, String comment) {
        Review newReview = Review.builder()
                .item_id(item_id)
                .rate(rate)
                .content(comment)
                .regdate(LocalDateTime.now())
                .build();

//        review.setRegdate(LocalDateTime.now());
        reviewRepository.save(newReview);
//        Long id = review.getId();
        return 1;
    }

    @Override
    public Review detail(Long id) {
        Review review = reviewRepository.findById(id);
        return review;
    }

    @Override
    public List<Review> list() {
        return reviewRepository.findAll();
    }

    @Override
    public Review selectById(Long id) {
        Review review = reviewRepository.findById(id);
        return review;
    }

    @Override
    public int update(Review review) {
        return reviewRepository.update(review);
    }

    @Override
    public int deleteById(Long id) {
        int result = 0;

        Review review = reviewRepository.findById(id);
        if (review != null) {
            result = reviewRepository.delete(review);
        }
        return result;
    }

    @Override
    public Review findByItemId(Long item_id) {
        return reviewRepository.findByItemId(item_id);
    }

    @Override
    public List<Review> findByItemMenu(Long menu_id) {
        return reviewRepository.findByItemMenu(menu_id);
    }

    @Override
    public int countAll(Long menu_id) {
        return reviewRepository.countAll(menu_id);
    }

    @Override
    public List<Review> findByUserId(Long userId) {
        return reviewRepository.findByUserId(userId);
    }


}
