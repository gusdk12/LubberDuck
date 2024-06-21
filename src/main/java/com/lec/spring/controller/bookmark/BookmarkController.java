package com.lec.spring.controller.bookmark;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.mypage.QryBookmarkList;
import com.lec.spring.service.bookmark.BookmarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;


@RestController // data를 response 한다 ( 'View' 를 리턴하는게 아니다! )
@RequestMapping("/bookmark")
public class BookmarkController {

    @Autowired
    private BookmarkService bookmarkService;

    // userId에 해당하는 즐겨찾기 데이터 불러오기
    @GetMapping("/list/{userId}")
    public QryBookmarkList list(@PathVariable Long userId){
        return bookmarkService.findByUser(userId);
    }

    @GetMapping("/detail/{userId}/{cocktailId}")
    public QryResult detail(@PathVariable Long userId, @PathVariable Long cocktailId){
        return bookmarkService.findByUserAndMenu(userId,cocktailId);
    }

    // 코멘트 작성 후 추가하기
    @PostMapping("/add")
    public QryResult add(
            @RequestParam("userId") Long userId,
            @RequestParam("cocktailId") Long cocktailId,
            String comment){
        return bookmarkService.add(userId, cocktailId, comment);
    }

    // 코멘트 수정하기
    @PostMapping("/update/{userId}/{cocktailId}")
    public QryResult update(
            @RequestParam("userId") Long userId,
            @RequestParam("cocktailId") Long cocktailId,
            String comment) {
        return bookmarkService.update(userId, cocktailId, comment);
    }

    // 삭제하기
    @PostMapping("/delete/{userId}/{cocktailId}")
    public QryResult delete(@PathVariable Long userId, @PathVariable Long cocktailId){
        return bookmarkService.delete(userId,cocktailId);
    }
}
