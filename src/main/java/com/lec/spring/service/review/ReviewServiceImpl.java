package com.lec.spring.service.review;

import com.lec.spring.domain.cart.Cart;
import com.lec.spring.domain.cart.QryCartList;
import com.lec.spring.domain.review.QryReviewList;
import com.lec.spring.domain.review.Review;
import com.lec.spring.repository.review.ReviewRepository;
import com.lec.spring.util.U;
import jakarta.servlet.http.HttpSession;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {


    @Value("${app.pagination.write_pages}")
    private int WRITE_PAGES;

    @Value("${app.pagination.page_rows}")
    private int PAGE_ROWS;

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
    public QryReviewList findByItemMenu(Long menu_id) {
        QryReviewList list = new QryReviewList();

        List<Review> reviews = reviewRepository.findByItemMenu(menu_id);

        list.setCount(reviews.size());
        list.setList(reviews);
        list.setStatus("OK");

        return list;
    }

    @Override
    public QryReviewList findByItemMenuPaging(Long menu_id, Integer page) {
        QryReviewList list = new QryReviewList();

        int sizePerPage = 4;

        int start = (page - 1) * sizePerPage;
        List<Review> reviews = reviewRepository.selectFromCocktailRow(menu_id, start, sizePerPage);

        list.setCount(reviews.size());
        list.setList(reviews);
        list.setStatus("OK");

        return list;
    }

    @Override
    public int countAll(Long menu_id) {
        return reviewRepository.countAll(menu_id);
    }

    @Override
    public List<Review> findByUserId(Long userId) {
        return reviewRepository.findByUserId(userId);
    }

    @Override
    public List<Review> list(Long user_id, Integer sort, Integer page, Model model) {
        if(page == null || page < 1) page = 1; // default page
        if(sort == null || sort < 1) sort = 1; // default sort

        HttpSession session = U.getSession();
        Integer writePages = (Integer) session.getAttribute("writePages");
        if (writePages == null) writePages = WRITE_PAGES;
        Integer pageRows = (Integer) session.getAttribute("pageRows");
        if (pageRows == null) pageRows = PAGE_ROWS;
        session.setAttribute("page", page);

        long cnt = reviewRepository.cntAll(user_id);
        int totalPage = (int) Math.ceil(cnt / (double) pageRows); // 총 '페이지' 분량

        int startPage = 0;
        int endPage = 0;

        List<Review> list = null;

        if(cnt > 0) {
           if(page>totalPage) page = totalPage;

           int fromRow = (page - 1) * pageRows;

           startPage = (((page -1) / writePages) * writePages) + 1;
           endPage = startPage + writePages - 1;
           if( endPage >= totalPage) endPage = totalPage;

           if(sort == 1) list = reviewRepository.selectFromReviewRowByDate(user_id, fromRow, pageRows);
           if(sort == 2) list = reviewRepository.selectFromReviewRowByRate(user_id, fromRow, pageRows);
           model.addAttribute("list", list);

        } else {

            page = 0;

        }

        model.addAttribute("cnt", cnt);  // 전체 글 개수
        model.addAttribute("page", page); // 현재 페이지
        model.addAttribute("totalPage", totalPage);  // 총 '페이지' 수
        model.addAttribute("pageRows", pageRows);  // 한 '페이지' 에 표시할 글 개수

        // [페이징]
        model.addAttribute("url", U.getRequest().getRequestURI());  // 목록 url
        model.addAttribute("writePages", writePages); // [페이징] 에 표시할 숫자 개수
        model.addAttribute("startPage", startPage);  // [페이징] 에 표시할 시작 페이지
        model.addAttribute("endPage", endPage);   // [페이징] 에 표시할 마지막 페이지

        model.addAttribute("sort", sort); // 현재 정렬방식

        return list;
    }



}


