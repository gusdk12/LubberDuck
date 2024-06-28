package com.lec.spring.controller.review;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.cart.QryCartList;
import com.lec.spring.domain.menu.Menu;
import com.lec.spring.domain.mypage.MypageValidator;
import com.lec.spring.domain.order.Order;
import com.lec.spring.domain.order.OrderItem;
import com.lec.spring.domain.review.QryReviewList;
import com.lec.spring.domain.review.Review;
import com.lec.spring.service.menu.MenuService;
import com.lec.spring.service.order.OrderService;
import com.lec.spring.service.order.OrderItemService;
import com.lec.spring.service.review.ReviewService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private MenuService menuService;

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private OrderService orderService;


    @GetMapping("/list/{menu_id}/{page}/{sort}")
    public QryReviewList listByMenu(@PathVariable Long menu_id,
                                    @PathVariable Integer page,
                                    @PathVariable Integer sort){


        return reviewService.findByItemMenuPaging(menu_id, page, sort);
    }


    // write가 완료가 되면, 그제서야, insert를 해줘야해.
    // insert는 reviewcontroller가 맞아. 단, restcontroller여야 한다.
    // update는 두 컨트롤러 전부 필요함.
    // delte는 reviewcontroller가 맞다.


    @PostMapping("/insert")
    public String insert(@RequestParam("item_id") Long item_id,
                         @RequestParam("rate") Integer rate,
                         @RequestParam("comment") String comment) {

        reviewService.write(item_id, rate, comment);

        return "";
    }

    @PostMapping("/modify")
    public ResponseEntity<Void> modify(@RequestParam("id") Long id,
                                       @RequestParam("rate") Integer rate,
                                       @RequestParam("comment") String comment) {
        Review existingReview = reviewService.selectById(id);
        existingReview.setRate(rate);
        existingReview.setContent(comment);
        reviewService.update(existingReview);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/deleteOk")
    public String deleteOk(Long id, Model model){
        model.addAttribute("result", reviewService.deleteById(id));
        return "review/deleteOk";
    }
}