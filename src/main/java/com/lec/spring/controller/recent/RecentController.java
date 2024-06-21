package com.lec.spring.controller.recent;

import com.lec.spring.service.recent.RecentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/recent")
public class RecentController {

    @Autowired
    private RecentService recentService;

    public RecentController() {
        System.out.println("RecentController() 생성");
    }

    @GetMapping("/list/{userId}")
    public String list(@PathVariable Long userId, Model model) {
        model.addAttribute("list",recentService.findByUser(userId));
        return "/recent/list";
    }
}
