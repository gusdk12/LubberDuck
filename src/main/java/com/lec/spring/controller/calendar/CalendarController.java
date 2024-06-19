package com.lec.spring.controller.calendar;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.UserValidator;
import com.lec.spring.domain.calendar.Calendar;
import com.lec.spring.domain.calendar.CalendarValidator;
import com.lec.spring.domain.calendar.QryCalendarList;
import com.lec.spring.domain.cart.QryCartList;
import com.lec.spring.domain.menu.Menu;
import com.lec.spring.service.calendar.CalendarService;
import com.lec.spring.service.menu.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController   // data 를 response 한다. ('View' 를 리턴하는게 아니다!)
@RequestMapping("/calendar")
public class CalendarController {

    private CalendarService calendarService;

    @Autowired
    public CalendarController(MenuService menuService, CalendarService calendarService) {
        this.calendarService = calendarService;
    }

    @GetMapping("/list")
    public QryCalendarList list(){

        QryCalendarList result = calendarService.list();

        return result;
    }

    @PostMapping("/addByMemo")
    public QryResult addByMemo(
            @RequestParam("memo") String memo,
            @RequestParam("date") String date){
        QryResult test = calendarService.addByMemo(memo, date);

        return test;
    }

    @PostMapping("/addByMenu")
    public QryResult addByMenu(){
        return null;
    }

    @PostMapping("/update/{calender_Id}")
    public QryResult update(@PathVariable Long calender_Id){
        return null;
    }

    @PostMapping("/delete/{calender_Id}")
    public QryResult delete(@PathVariable Long calender_Id){
        return null;
    }

    @PostMapping("/saveMemo")
    @ResponseBody
    public Calendar saveMemo(@RequestBody Calendar calendar) {
        System.out.println("Received memo to save: " + calendar);
        return calendarService.saveMemo(calendar);
    }

    @GetMapping("/calendar/memos/{date}")
    @ResponseBody
    public List<Calendar> getMemosByDate(@PathVariable String date) {
        return calendarService.findByDate(date);
    }


}
