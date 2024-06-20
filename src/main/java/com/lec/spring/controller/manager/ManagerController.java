package com.lec.spring.controller.manager;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.calendar.Calendar;
import com.lec.spring.domain.calendar.CalendarValidator;
import com.lec.spring.domain.management.ManagementValidator;
import com.lec.spring.domain.menu.Menu;
import com.lec.spring.service.calendar.CalendarService;
import com.lec.spring.service.menu.MenuService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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
        binder.setValidator(new ManagementValidator());
    }

    @GetMapping("/calendar")
    public void calendar(Model model) {
        List<Menu> menuList = menuService.list();
        model.addAttribute("menuList", menuList);
    }

    // 모음집 및 손님용 메뉴판 칵테일 조회
    @GetMapping("/management/write")
    public void list(Model model, Menu menu) {
        model.addAttribute("allList", menuService.list());
        model.addAttribute("menuList", menuService.sequenceList());
    }

    // 메뉴 상세정보
    @GetMapping("/management/detail/{id}")
    public String detail(@PathVariable Long id, Model model) {
        model.addAttribute("menu", menuService.detail(id));
        return "manager/management/detail";
    }

    // 메뉴 상세조회 수정
    @GetMapping("/management/update/{id}")
    public String change(@PathVariable Long id, Model model) {
        model.addAttribute("menu", menuService.selectById(id));
        return "manager/management/update";
    }

    @PostMapping("/management/update")
    public String changeOk(@Valid Menu menu,
                           BindingResult result,
                           Model model,
                           RedirectAttributes redirectAttrs){

        if (result.hasErrors()){
            redirectAttrs.addFlashAttribute("price", menu.getPrice());
            redirectAttrs.addFlashAttribute("info", menu.getInfo());

            List<FieldError> errList = result.getFieldErrors();
            for (FieldError err : errList) {
                redirectAttrs.addFlashAttribute("error_" + err.getField(), err.getCode());
            }
            return "redirect:/manager/management/update/" + menu.getId();
        }
        model.addAttribute("result", menuService.update(menu));
        return "manager/management/updateOk";
    }
}
