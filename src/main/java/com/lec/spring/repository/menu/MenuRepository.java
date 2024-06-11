package com.lec.spring.repository.menu;

import com.lec.spring.domain.menu.Menu;

import java.util.List;

public interface MenuRepository {

    Menu findByName(String name);

    List<Menu> findAll();

    List<Menu> findAllSequenceMenu();

}
