package com.lec.spring.controller.calendar;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.calendar.Calendar;
import com.lec.spring.domain.calendar.QryCalendarList;
import com.lec.spring.service.calendar.CalendarService;
import com.lec.spring.service.menu.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController   // data 를 response 한다. ('View' 를 리턴하는게 아니다!)
@RequestMapping("/calendar")
public class CalendarController {

    private CalendarService calendarService;

    @Autowired
    public CalendarController(MenuService menuService, CalendarService calendarService) {
        this.calendarService = calendarService;
    }

    // 모든 일정 불러오기
    @GetMapping("/list")
    public QryCalendarList list(Model model){
        QryCalendarList calendarList = calendarService.list();
        model.addAttribute("calendarList", calendarList);

        return calendarList;
    }

    // 특정 날짜의 메모 불러오기
    @GetMapping("/detail/{date}")
    @ResponseBody
    public Calendar getMemosByDate(@PathVariable String date) {
        return calendarService.findByDate(date);
    }

    // 특정 날짜에 메모 추가
    @PostMapping("/addByMemo")
    public QryResult addByMemo(
            @RequestParam("memo") String memo,
            @RequestParam("date") String date){
        QryResult result = calendarService.addByMemo(memo, date);

        return result;
    }

    // 특정 날짜에 오늘의 메뉴 추가
    @PostMapping("/addByMenu")
    public QryResult addByMenu(){
        return null;
    }

    // 캘린더 데이터(메모, 오늘의 메뉴) 수정
    @PostMapping("/update")
    public QryResult update(
            @RequestParam("id") Long calendarId,
            @RequestParam("memo") String memo) {
        QryResult result = calendarService.update(calendarId, memo);
        return result;
    }

    // 캘린더 데이터(메모, 오늘의 메뉴) 삭제
    @PostMapping("/delete/{calender_Id}")
    public QryResult delete(@PathVariable Long calender_Id){
        return null;
    }
}
