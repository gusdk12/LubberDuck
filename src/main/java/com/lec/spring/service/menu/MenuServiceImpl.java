package com.lec.spring.service.menu;

import com.lec.spring.domain.menu.Menu;
import com.lec.spring.repository.menu.MenuRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuServiceImpl implements MenuService {

    private MenuRepository menuRepository;

    @Autowired
    public MenuServiceImpl(SqlSession sqlSession) {
    menuRepository = sqlSession.getMapper(MenuRepository.class);
    }

    @Override
    public List<Menu> list() {
    return menuRepository.findAll();
    }

    @Override
    public List<Menu> sequenceList() {
    return menuRepository.findAllSequenceMenu();
    }

    @Override
    public Menu findById(Long menu_id) {
        return menuRepository.findById(menu_id);
    }

    @Override
    public Menu findByCocktailName(String name) {
    return menuRepository.findByName(name);
    }

    // 특정 id 칵테일 조회
    @Override
    public Menu detail(Long id) {
    return menuRepository.findInfoById(id);
    }

    // 특정 id 칵테일 정보 수정(가격, 소개글)
    @Override
    public int update(Menu menu) {
    return menuRepository.change(menu);
    }
    // 특정 id 칵테일 정보 호출
    @Override
    public Menu selectById(Long id) {
    return menuRepository.findById(id);
  }

}
