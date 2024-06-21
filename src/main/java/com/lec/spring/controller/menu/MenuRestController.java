package com.lec.spring.controller.menu;

import com.lec.spring.domain.menu.Menu;
import com.lec.spring.service.menu.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // data 를 response 한다 ( 'View' 를 리턴하는게 아니다! )
@RequestMapping("/menumanager")
public class MenuRestController {

    @Autowired
    private MenuService menuService;

    @PostMapping("/updateAll")
    public void updateAll(@RequestBody List<Menu> data) {
        for (Menu menu : data) {
            menuService.updateMenu(menu);
        }
    }
}
