package com.lec.spring.controller.menu;

import com.lec.spring.service.menu.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/menuplate")
public class MenuplateController {

    @Autowired
    private MenuService menuService;

    @GetMapping("/list")
    public void list(Model model){
        model.addAttribute("menuList", menuService.sequenceList());
    }
}
