package com.lec.spring.controller.pay;

import com.lec.spring.domain.User;
import com.lec.spring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pay")
public class PayController {

    @Autowired
    private UserService userService;

    @GetMapping("/list")
    public String list(Model model, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) return "redirect:/user/login"; // UserDetails가 null일 경우에 대한 처리

        String username = userDetails.getUsername();
        User user = userService.findByUsername(username);
        if (user == null) return "redirect:/error"; // 사용자가 null일 경우에 대한 처리

        model.addAttribute("user", user);
        return "pay/list";
    }

}
