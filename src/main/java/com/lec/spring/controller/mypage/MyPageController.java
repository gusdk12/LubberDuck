package com.lec.spring.controller.mypage;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/mypage")
public class MyPageController {

    @RequestMapping("/info")
    public void info(){}
    @RequestMapping("/order")
    public void order(){}

    @RequestMapping("/review")
    public void review(){}

    @RequestMapping("/bookmark")
    public void bookmark(){}
}
