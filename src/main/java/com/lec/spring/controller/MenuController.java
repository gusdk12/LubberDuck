package com.lec.spring.controller;

import com.lec.spring.service.menu.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/menu")
public class MenuController {

  @Autowired
  private MenuService menuService;

  @GetMapping("/write")
  public void list(Model model){
    model.addAttribute("allList", menuService.list());
    model.addAttribute("menuList", menuService.sequenceList());
  }

//  @GetMapping("/wrtie")
//  public String wrtie()
}
