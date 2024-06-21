package com.lec.spring.service.review;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.User;
import com.lec.spring.domain.menu.Menu;
import com.lec.spring.domain.mypage.Bookmark;
import com.lec.spring.domain.order.Order_item;
import com.lec.spring.domain.review.QryReviewList;
import com.lec.spring.domain.review.Review;
import com.lec.spring.repository.menu.MenuRepository;
import com.lec.spring.repository.order.OrderRepository;
import com.lec.spring.repository.order.Order_ItemRepository;
import com.lec.spring.repository.review.ReviewRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {
    private ReviewRepository reviewRepository;

    private MenuRepository menuRepository;

    private OrderRepository orderRepository;

    private Order_ItemRepository orderItemRepository;


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
    public List<Review> findByItemId(Long item_id) {
        return reviewRepository.findByItemId(item_id);
    }

//    @Override
//    public QryResult write(Long itemId, int rate, String content, LocalDateTime regdate) {
//
//        Order_item order_item = orderItemRepository.findById(itemId);
//
//        Review review=Review.builder()
//                .item_id(order_item.getId())
//                .rate(rate)
//                .content(content)
//                .regdate(LocalDateTime.now())
//                .build();
//
//        int cnt = reviewRepository.save(review);
//
//        QryResult result = QryResult.builder()
//                .count(cnt)
//                .status("OK")
//                .build();
//
//        return result;
//    }
}
