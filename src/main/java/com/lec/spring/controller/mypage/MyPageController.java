package com.lec.spring.controller.mypage;

import com.lec.spring.service.order.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/mypage")
public class MyPageController {

    @Autowired
    private OrderService orderService;


    @RequestMapping("/info")
    public void info(){}
    @RequestMapping("/order")
    public void order(){}

    @RequestMapping("/review")
    public void review(){}

    @RequestMapping("/bookmark")
    public void bookmark(){}
}
