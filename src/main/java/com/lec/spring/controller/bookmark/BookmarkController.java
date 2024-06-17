package com.lec.spring.controller.bookmark;

import com.lec.spring.domain.mypage.Bookmark;
import com.lec.spring.domain.mypage.QryBookmarkList;
import com.lec.spring.service.bookmark.BookmarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController // data를 response 한다 ( 'View' 를 리턴하는게 아니다! )
@RequestMapping("/bookmark")
public class BookmarkController {

    @Autowired
    private BookmarkService bookmarkService;

    @GetMapping("/list/{userId}")
    public QryBookmarkList list(@PathVariable Long userId){
        return bookmarkService.list(userId);
    }
}
