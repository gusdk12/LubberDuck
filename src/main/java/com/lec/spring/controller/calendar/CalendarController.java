package com.lec.spring.controller.calendar;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.calendar.Calendar;
import com.lec.spring.domain.calendar.QryCalendarList;
import com.lec.spring.service.calendar.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController   // data 를 response 한다. ('View' 를 리턴하는게 아니다!)
@RequestMapping("/calendar")
public class CalendarController {

    @Autowired
    private CalendarService calendarService;


    // 모든 일정 불러오기
    @GetMapping("/list")
    public QryCalendarList list(){
        return calendarService.findAll();
    }

    // 특정 날짜 불러오기
    @GetMapping("/detail/{id}")
    @ResponseBody
    public Calendar getMemosById(@PathVariable Long id) {
        return calendarService.findById(id);
    }

    // 특정 날짜에 아무 데이터도 없을 때 오늘의 메뉴 추가
    @PostMapping("/addByMenu")
    public QryResult addByMenu(
            @RequestParam("menu_id") Long menu_id,
            @RequestParam("comment") String comment,
            @RequestParam("date") String date){
        QryResult result = calendarService.addByMenu(menu_id, comment, date);

        return result;
    }

    // 특정 날짜에 아무 데이터도 없을 때 메모 추가
    @PostMapping("/addByMemo")
    public QryResult addByMemo(
            @RequestParam("memo") String memo,
            @RequestParam("date") String date){
        QryResult result = calendarService.addByMemo(memo, date);

        return result;
    }

    // 캘린더 데이터(메모, 오늘의 메뉴) 수정
    @PostMapping("/update/{id}")
    public QryResult update(
            @PathVariable Long id,
            @RequestParam("menu_id") Long menu_id,
            @RequestParam("comment") String comment,
            @RequestParam("memo") String memo
    ) {
        QryResult result = calendarService.update(id, menu_id, comment, memo);
        return result;
    }

    @PostMapping("/deleteById/{id}")
    public QryResult deleteById(@PathVariable Long id) {
        QryResult result = calendarService.deleteById(id);
        return result;
    }
}
