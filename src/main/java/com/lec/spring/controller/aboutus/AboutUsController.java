package com.lec.spring.controller.aboutus;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class AboutUsController {
    @GetMapping("/aboutus")
    public void aboutus(){

    }
}
