package com.lec.spring.service.menuplate;

import com.lec.spring.domain.menuplate.Menu;

import java.util.List;

public interface MenuService {

    List<Menu> list();

    Menu findByCocktailName(String name);

}
