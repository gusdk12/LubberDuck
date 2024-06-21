package com.lec.spring.controller.review;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.menu.Menu;
import com.lec.spring.domain.mypage.MypageValidator;
import com.lec.spring.domain.order.Order;
import com.lec.spring.domain.order.Order_item;
import com.lec.spring.domain.review.Review;
import com.lec.spring.service.menu.MenuService;
import com.lec.spring.service.order.OrderService;
import com.lec.spring.service.order.Order_itemService;
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
    private Order_itemService orderItemService;

    @Autowired
    private OrderService orderService;


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

    @GetMapping("/update")
    public void update(){}

    @GetMapping("/delete/{id}")
    public void delete(){}
}