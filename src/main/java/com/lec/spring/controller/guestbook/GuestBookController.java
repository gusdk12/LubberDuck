package com.lec.spring.controller.guestbook;

import com.lec.spring.domain.User;
import com.lec.spring.service.UserService;
import com.lec.spring.service.guestBook.GuestBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class GuestBookController {


    @GetMapping("/guestbook")
    public void guestbook(Model model){

    }


}
