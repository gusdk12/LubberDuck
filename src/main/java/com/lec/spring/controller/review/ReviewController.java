package com.lec.spring.controller.review;

import com.lec.spring.domain.menu.Menu;
import com.lec.spring.domain.order.Order;
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

    // 맞는데, 여기서 필요한건 order_item밖에 필요가 없더.
    // write관련은 mypagecontroller임.
    //@GetMapping("/write/{item_id}")
    //public String write(@PathVariable("item_id") Long item_id, Model model){
    //    Order_item item = orderItemService.findById(item_id);
    //    model.addAttribute("item", item);
    //    return "review/write";
    //}

    // write가 완료가 되면, 그제서야, insert를 해줘야해.
    // insert는 reviewcontroller가 맞아. 단, restcontroller여야 한다.
    // update는 두 컨트롤러 전부 필요함.
    // delte는 reviewcontroller가 맞다.

   // @PostMapping("/review/write")
   // public String submitReview(@RequestParam("item_id") Long item_id,
     //                          @RequestParam("rate") int rate,
      //                         @RequestParam("comment") String comment,
       //                        Model model) {


    //    return "redirect:/review/writeOk"; // 리뷰 작성 성공 페이지로 이동
   // }

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