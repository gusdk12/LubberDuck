package com.lec.spring.controller.manager;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.calendar.Calendar;
import com.lec.spring.domain.calendar.CalendarValidator;
import com.lec.spring.domain.menu.Menu;
import com.lec.spring.service.calendar.CalendarService;
import com.lec.spring.service.menu.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/manager")
public class ManagerController {

    private MenuService menuService;
    private CalendarService calendarService;


    @Autowired
    CalendarValidator calendarValidator;

    @Autowired
    public ManagerController(MenuService menuService, CalendarService calendarService) {
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
    }

}
