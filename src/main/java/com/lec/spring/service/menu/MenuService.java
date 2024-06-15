package com.lec.spring.service.menu;

import com.lec.spring.domain.menu.Menu;

import java.util.List;

public interface MenuService {

  List<Menu> list();

  List<Menu> sequenceList();

  Menu findById(Long menu_id);

  Menu findByCocktailName(String name);

  // 특정 id 칵테일 조회
  Menu detail(Long id);

  // 특정 id 칵테일 정보 수정(가격, 소개글)
  int update(Menu menu);

  // 특정 id 칵테일 정보 호출
  Menu selectById(Long id);
}
