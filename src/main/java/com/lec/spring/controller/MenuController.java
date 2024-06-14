package com.lec.spring.controller;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.User;
import com.lec.spring.domain.cart.QryCartList;
import com.lec.spring.domain.menu.Menu;
import com.lec.spring.service.menu.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

  @GetMapping("/find/{cocktailName}")
  public QryResult find(@PathVariable String cocktailName){
    Menu menu = menuService.findByCocktailName(cocktailName);
    if(menu == null)
      return null;

    QryResult result = QryResult.builder()
            .count(1)
            .status("OK")
            .build();

    return result;
  }


//  @GetMapping("/wrtie")
//  public String wrtie()
}
