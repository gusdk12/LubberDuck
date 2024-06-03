package com.lec.spring.repository.menuplate;

import com.lec.spring.domain.menuplate.Menu;

import java.util.List;

public interface MenuRepository {

    Menu findByName(String name);

    List<Menu> findAll();

}
