package com.lec.spring.controller.mypage;

import com.lec.spring.domain.User;
import com.lec.spring.service.UserService;
import com.lec.spring.service.menu.MenuService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDate;
import java.util.List;

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
    public String myPageUpdate(Model model,
                             @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return "redirect:/user/login";
        }

        String username = userDetails.getUsername();
        User user = userService.findByUsername(username);
        if (user == null) {
            return "redirect:/error";
        }

        LocalDate birthDate = user.getBirth_date(); // 예: "1995-05-05"
        if(birthDate != null){
            model.addAttribute("year", birthDate.getYear());
            model.addAttribute("month", birthDate.getMonthValue());
            model.addAttribute("day", birthDate.getDayOfMonth());
        }

        model.addAttribute("user", user);
        return "mypage/myPageUpdate";

    }

    @PostMapping("/myPageUpdate")
    public String myPageUpdateOk(
            @RequestParam("year") int year
            ,@RequestParam("month") int month
            ,@RequestParam("day") int day
            , @Valid User user
            , BindingResult result
            , Model model
            , RedirectAttributes redirectAttrs
    ){
        if (result.hasErrors()){
            redirectAttrs.addFlashAttribute("nickname", user.getNickname());
            redirectAttrs.addFlashAttribute("email", user.getEmail());
            redirectAttrs.addFlashAttribute("year", year);
            redirectAttrs.addFlashAttribute("month", month);
            redirectAttrs.addFlashAttribute("day", day);

            List<FieldError> errList = result.getFieldErrors();
            for(FieldError err : errList){
                redirectAttrs.addFlashAttribute("error", err.getCode());
                break;
            }
            return "redirect:/mypage/myPageUpdate";
        }

        user.setBirth_date(LocalDate.of(year, month, day));

        int updateResult = userService.update(user);

        if (updateResult > 0) {
            model.addAttribute("success", true);
        } else {
            model.addAttribute("success", false);
        }

        return "mypage/myPageUpdateOk";
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
