package com.lec.spring.service.menu;

import com.lec.spring.domain.menu.Menu;

import java.util.List;

public interface MenuService {

    List<Menu> list();

    List<Menu> sequenceList();

    Menu findById(Long menu_id);
    Menu findByCocktailName(String name);

}
