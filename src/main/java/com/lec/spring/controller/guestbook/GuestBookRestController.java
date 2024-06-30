package com.lec.spring.controller.guestbook;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.cart.QryCartList;
import com.lec.spring.domain.guestBook.QryGuestBookLIst;
import com.lec.spring.service.guestBook.GuestBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/guestbook")
public class GuestBookRestController {

    @Autowired
    private GuestBookService guestBookService;

    @GetMapping("/list")
    public QryGuestBookLIst list(){
        return guestBookService.postItAll();
    }

    @PostMapping("/write")
    public QryResult write(@RequestParam("userId") Long user_id,
                           @RequestParam("x") Double x_coordinate,
                           @RequestParam("y") Double y_coordinate,
                           @RequestParam("content") String content,
                           @RequestParam("postIt") Integer postItKind){
        return guestBookService.write(user_id, x_coordinate,  y_coordinate, content, postItKind);
    }

    @PostMapping("/update")
    public QryResult update(@RequestParam("memoId") Long id,
                            @RequestParam("userId") Long user_id,
                            @RequestParam("x") Double x_coordinate,
                            @RequestParam("y") Double y_coordinate){
        return guestBookService.updateByPostIt(id, user_id, x_coordinate, y_coordinate);
    }
}
