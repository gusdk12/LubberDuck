package com.lec.spring.controller;

import com.lec.spring.config.PrincipalDetails;
import com.lec.spring.domain.User;
import com.lec.spring.service.menu.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/")
public class HomeController {

    @Autowired
    private MenuService menuService;

    @RequestMapping("/")
    public String homeBasic(Model model){
        return "redirect:/home";
    }

    @GetMapping("/home")
    public void home(Model model){
        model.addAttribute("menuList", menuService.sequenceList());
    }

    //-------------------------------------------------------------------------
    // 현재 Authentication 보기 (디버깅 등 용도로 활용)
    @RequestMapping("/auth")
    @ResponseBody
    public Authentication auth() {

        return SecurityContextHolder.getContext().getAuthentication();
    }

    // 매개변수에 Authentication 을 명시해도 주입된다.  (인증후에만 가능)
    @RequestMapping("/userDetails")
    @ResponseBody
    public PrincipalDetails userDetails(Authentication authentication){
        return (PrincipalDetails) authentication.getPrincipal();
    }

    // @AuthenticationPrincipal 을 사용하여 로그인한 사용자 정보 주입받을수 있다.
    // org.springframework.security.core.annotation.AuthenticationPrincipal
    @RequestMapping("/user")
    @ResponseBody
    public User username(@AuthenticationPrincipal PrincipalDetails userDetails){
        return (userDetails != null) ? userDetails.getUser() : null;
    }

}
