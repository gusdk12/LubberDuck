package com.lec.spring.controller.menu;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.User;
import com.lec.spring.domain.cart.QryCartList;
import com.lec.spring.domain.menu.Menu;
import com.lec.spring.domain.review.Review;
import com.lec.spring.service.menu.MenuService;
import com.lec.spring.service.review.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/menu")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/detail/{menu_id}")
    public String detail(@PathVariable Long menu_id, Model model){
        Menu menu = menuService.findById(menu_id);
        if (menu == null) {
            // 처리할 내용 추가
        }

        model.addAttribute("menu", menu);
        model.addAttribute("menuList", menuService.sequenceList());

        List<Review> reviews = reviewService.findByItemMenu(menu_id);
        model.addAttribute("reviews", reviews);
        return "menu/detail";
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

}
