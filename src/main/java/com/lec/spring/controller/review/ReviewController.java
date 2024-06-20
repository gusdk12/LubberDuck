package com.lec.spring.controller.review;

import com.lec.spring.domain.menu.Menu;
import com.lec.spring.domain.order.Order_item;
import com.lec.spring.domain.review.Review;
import com.lec.spring.service.menu.MenuService;
import com.lec.spring.service.order.OrderService;
import com.lec.spring.service.order.Order_itemService;
import com.lec.spring.service.review.ReviewService;
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

import java.util.List;

@Controller
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private MenuService menuService;

    @Autowired
    private Order_itemService orderItemService;

    @Autowired
    private OrderService orderService;

    public ReviewController(){}

    @GetMapping("/write/{item_id}")
    public String write(@PathVariable("item_id") Long item_id, Model model){
        Review review = reviewService.selectById(item_id);
        model.addAttribute("review", review);
        model.addAttribute("reviewList", reviewService.list());
        return "review/write";
    }

    @PostMapping("/review/write")
    public String submitReview(@RequestParam("item_id") Long item_id,
                               @RequestParam("rate") int rate,
                               @RequestParam("comment") String comment,
                               Model model) {


        return "redirect:/review/writeOk"; // 리뷰 작성 성공 페이지로 이동
    }

    @GetMapping("/update")
    public void update(){}

    @GetMapping("/delete/{id}")
    public void delete(){}



//    @GetMapping("/item/{itemId}")
//    public ResponseEntity<Review> getReviewByItemId(@PathVariable Long itemId) {
//        Review review = reviewService.findByItemId(itemId);
//        if (review != null) {
//            return ResponseEntity.ok(review);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

}