package com.lec.spring.controller.guestbook;

import com.lec.spring.domain.cart.QryCartList;
import com.lec.spring.domain.guestBook.QryGuestBookLIst;
import com.lec.spring.service.guestBook.GuestBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/guestbook")
public class GuestBookRestController {

    @Autowired
    private GuestBookService guestBookService;

    @GetMapping("/list")
    public QryGuestBookLIst list(){
        return guestBookService.postItAll();
    }
}
