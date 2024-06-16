package com.lec.spring.controller.calender;

import com.lec.spring.domain.menu.Menu;
import com.lec.spring.service.menu.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class CalenderController {

    private MenuService menuService;

    @Autowired
    public CalenderController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping("/calendar")
    public void calender(Model model) {
        List<Menu> menuList = menuService.list();
        model.addAttribute("menuList", menuList);
    }

}
