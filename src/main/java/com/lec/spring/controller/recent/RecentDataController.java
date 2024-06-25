package com.lec.spring.controller.recent;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.recent.QryRecentList;
import com.lec.spring.service.recent.RecentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recentData")
public class RecentDataController {

    @Autowired
    private RecentService recentService;

    @GetMapping("/list/{userId}")
    public QryRecentList list(@PathVariable Long userId) {
        return recentService.findByUser(userId);
    }

    @GetMapping("/detail/{userId}/{cocktailId}")
    public QryResult detail(@PathVariable Long userId, @PathVariable Long cocktailId){
        return recentService.findByUserAndMenu(userId,cocktailId);
    }

    @PostMapping("/add")
    public QryResult add(
            @RequestParam("userId") Long userId,
            @RequestParam("cocktailId") Long cocktailId){
        return recentService.add(userId, cocktailId);
    }

    @PostMapping("/deleteLimit/{userId}")
    public QryResult deleteLimit(@PathVariable Long userId){
        return recentService.deleteLimit(userId);
    }

    @PostMapping("/delete/{userId}/{cocktailId}")
    public QryResult delete(@PathVariable Long userId, @PathVariable Long cocktailId){
        return recentService.delete(userId,cocktailId);
    }


}
