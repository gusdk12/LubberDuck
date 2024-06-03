package com.lec.spring.service.menuplate;

import com.lec.spring.domain.menuplate.Menu;
import com.lec.spring.repository.menuplate.MenuRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuServiceImpl implements MenuService {

    private MenuRepository menuRepository;

    @Autowired
    public MenuServiceImpl(SqlSession sqlSession){
        menuRepository = sqlSession.getMapper(MenuRepository.class);
    }

    @Override
    public List<Menu> list() {
        return menuRepository.findAll();
    }

    @Override
    public Menu findByCocktailName(String name) {
        return menuRepository.findByName(name);
    }
}
