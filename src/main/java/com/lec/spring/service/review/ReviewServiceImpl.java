package com.lec.spring.service.review;

import com.lec.spring.domain.review.Review;
import com.lec.spring.repository.review.ReviewRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {
    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewServiceImpl(SqlSession sqlSession){
        reviewRepository = sqlSession.getMapper(ReviewRepository.class);
    }

    @Override
    public int write(Review review) {
        return reviewRepository.save(review);
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
    public List<Review> findByItemId(Long item_id) {
        return reviewRepository.findByItemId(item_id);
    }
}
