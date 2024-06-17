package com.lec.spring.controller.mypage;

import com.lec.spring.domain.User;
import com.lec.spring.service.UserService;
import com.lec.spring.service.menu.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/mypage")
public class MyPageController {

    @Autowired
    private UserService userService;

    @Autowired
    private MenuService menuService;

    @GetMapping("/info")
    public String info(Model model,
                       @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            // UserDetails가 null일 경우에 대한 처리
            // 로그인 페이지로 리디렉션할 수 있습니다.
            return "redirect:/user/login";
        }

        String username = userDetails.getUsername();
        User user = userService.findByUsername(username);
        if (user == null) {
            // 사용자가 null일 경우에 대한 처리
            // 적절한 예외 처리를 할 수 있습니다.
            return "redirect:/error";
        }

        model.addAttribute("user", user);
        return "mypage/info";
    }

    @GetMapping("/myPageUpdate")
    public void myPageUpdate(Model model,
                             @AuthenticationPrincipal UserDetails userDetails) {

    }





    @RequestMapping("/info")
    public void info(){}
    @RequestMapping("/order")
    public void order(){}

    @RequestMapping("/review")
    public void review(){}

    @GetMapping("/bookmark")
    public void bookmark(Model model){
        model.addAttribute("menuList", menuService.sequenceList());
    }
}
