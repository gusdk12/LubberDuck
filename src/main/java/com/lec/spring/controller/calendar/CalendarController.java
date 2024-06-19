package com.lec.spring.controller.calendar;

import com.lec.spring.domain.UserValidator;
import com.lec.spring.domain.calendar.Calendar;
import com.lec.spring.domain.calendar.CalendarValidator;
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

@Controller
@RequestMapping("/admin")
public class CalendarController {

    private MenuService menuService;

    private CalendarService calendarService;


    @Autowired
    CalendarValidator calendarValidator;

    @Autowired
    public CalendarController(MenuService menuService, CalendarService calendarService) {
        this.menuService = menuService;
        this.calendarService = calendarService;
    }

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.setValidator(new CalendarValidator());
    }

    @GetMapping("/calendar")
    public void calendar(Model model) {
        List<Menu> menuList = menuService.list();
        model.addAttribute("menuList", menuList);
        List<Calendar> calendarList = calendarService.list();
        model.addAttribute("calendarList", calendarList);
    }

    @PostMapping("/calendar/saveMemo")
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

    // 메뉴 ID로 메뉴 조회
    @GetMapping("/calendar/{menuId}")
    public ResponseEntity<Menu> getMenuById(@PathVariable Long menuId) {
        Menu menu = menuService.selectById(menuId);
        if (menu != null) {
            return ResponseEntity.ok(menu);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
