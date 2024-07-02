package com.lec.spring.controller.guestbook;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.guestBook.QryGuestBookLIst;
import com.lec.spring.service.guestBook.GuestBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/guestbook")
public class GuestBookRestController {

    @Autowired
    private GuestBookService guestBookService;

    // 모든 방명록 조회
    @GetMapping("/list")
    public QryGuestBookLIst list() {
        return guestBookService.postItAll();
    }

    // 새로운 방명록 작성
    @PostMapping("/write")
    public QryResult write(@RequestParam("userId") Long user_id,
                           @RequestParam("x") Double x_coordinate,
                           @RequestParam("y") Double y_coordinate,
                           @RequestParam("z") Long z_coordinate,
                           @RequestParam("content") String content,
                           @RequestParam("postIt") Integer postItKind) {
        return guestBookService.write(user_id, x_coordinate, y_coordinate, z_coordinate, content, postItKind);
    }

    // 방명록 수정
    @PostMapping("/update")
    public QryResult update(@RequestParam("memoId") Long id,
                            @RequestParam("userId") Long user_id,
                            @RequestParam("x") Double x_coordinate,
                            @RequestParam("y") Double y_coordinate,
                            @RequestParam("z") Long z_coordinate) {
        return guestBookService.updateByPostIt(id, user_id, x_coordinate, y_coordinate, z_coordinate);
    }

    // 방명록 삭제
    @PostMapping("/delete")
    public QryResult delete(@RequestParam("memoId") Long id){
        return guestBookService.deleteById(id);
    }

    // 최대값 찾기
    @PostMapping("/find")
    public Long find(){
        return guestBookService.maxZ_index();
    }
}
