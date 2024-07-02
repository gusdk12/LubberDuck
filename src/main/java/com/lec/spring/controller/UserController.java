package com.lec.spring.controller;

import com.lec.spring.domain.User;
import com.lec.spring.domain.UserValidator;
import com.lec.spring.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDate;
import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public String login(HttpServletRequest request, Model model) {
        String referrer = request.getHeader("Referer");
        request.getSession().setAttribute("prevPage", referrer);
        return "user/login";
    }

    @PostMapping("/login")
        public String loginSuccess(HttpServletRequest request){
        String prevPage = (String) request.getSession().getAttribute("prevPage");
        if(prevPage != null){
            request.getSession().removeAttribute("prevPage");
            return "redirect:" + prevPage;
        }
        return "redirect:/defaultPage";
    }

    // onAuthenticationFailure 에서 로그인 실패시 forwarding 용
    // request 에 담겨진 attribute 는 Thymeleaf 에서 그대로 표현 가능.
    @PostMapping("/loginError")
    public String loginError() {
        return "user/login";
    }

    @RequestMapping("/rejectAuth")
    public String rejectAuth() {
        return "common/rejectAuth";
    }


    @RequestMapping("/registerChoice")
    public void registerChoice() {
    }


    @GetMapping("/registerCustomer")
    public void registerCustomer() {

    }

    @GetMapping("/registerManager")
    public void registerManager() {

    }

    @PostMapping("/registerCustomer")
    public String registerCustomerOk(@Valid User user,
                                     BindingResult result,
                                     @RequestParam("year") int year,
                                     @RequestParam("month") int month,
                                     @RequestParam("day") int day,
                                     Model model,
                                     RedirectAttributes redirectAttrs) {

        if (result.hasErrors()) {
            redirectAttrs.addFlashAttribute("username", user.getUsername());
            redirectAttrs.addFlashAttribute("nickname", user.getNickname());
            redirectAttrs.addFlashAttribute("email", user.getEmail());
            redirectAttrs.addFlashAttribute("year", year);
            redirectAttrs.addFlashAttribute("month", month);
            redirectAttrs.addFlashAttribute("day", day);

            List<FieldError> errList = result.getFieldErrors();
            for (FieldError err : errList) {
                redirectAttrs.addFlashAttribute("error", err.getCode());
                break;
            }

            return "redirect:/user/registerCustomer";
        }

        user.setBirth_date(LocalDate.of(year, month, day));
        int cnt = userService.register(user, "ROLE_CUSTOMER");
        model.addAttribute("result", cnt);
        return "/user/registerCustomer";
    }

    @PostMapping("/registerManager")
    public String registerManagerOk(@Valid User user,
                                     BindingResult result,
                                     @RequestParam("year") int year,
                                     @RequestParam("month") int month,
                                     @RequestParam("day") int day,
                                     Model model,
                                     RedirectAttributes redirectAttrs) {

        if (result.hasErrors()) {
            redirectAttrs.addFlashAttribute("username", user.getUsername());
            redirectAttrs.addFlashAttribute("nickname", user.getNickname());
            redirectAttrs.addFlashAttribute("email", user.getEmail());
            redirectAttrs.addFlashAttribute("year", year);
            redirectAttrs.addFlashAttribute("month", month);
            redirectAttrs.addFlashAttribute("day", day);

            List<FieldError> errList = result.getFieldErrors();
            for (FieldError err : errList) {
                redirectAttrs.addFlashAttribute("error", err.getCode());
                break;
            }

            return "redirect:/user/registerManager";
        }

        user.setBirth_date(LocalDate.of(year, month, day));
        int cnt = userService.register(user, "ROLE_MANAGER");
        model.addAttribute("result", cnt);
        return "/user/registerManager";
    }


    @Autowired
    UserValidator userValidator;

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.setValidator(userValidator);
    }

}


