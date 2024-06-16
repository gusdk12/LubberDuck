package com.lec.spring.controller.cart;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.cart.QryCartList;
import com.lec.spring.service.cart.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController   // data 를 response 한다. ('View' 를 리턴하는게 아니다!)
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping("/list/{userId}")
    public QryCartList list(@PathVariable Long userId){
        return cartService.findByUser(userId);
    }

    @GetMapping("/detail/{userId}/{cocktailId}")
    public QryResult detail(@PathVariable Long userId, @PathVariable Long cocktailId){
        return cartService.findByUserAndMenu(userId, cocktailId);
    }

    @PostMapping("/add")
    public QryResult add(
            @RequestParam("userId") Long userId,
            @RequestParam("cocktailId") Long cocktailId,
            Integer quantity){
        return cartService.add(userId, cocktailId, quantity);
    }

    @PostMapping("/delete/{user_Id}/{cocktail_Id}")
    public QryResult delete(@PathVariable Long user_Id, @PathVariable Long cocktail_Id){
        return cartService.delete(user_Id, cocktail_Id);
    }

    @PostMapping("/incQuantity/{user_Id}/{cocktail_Id}")
    public QryResult incQuantity(@PathVariable Long user_Id, @PathVariable Long cocktail_Id){
        return cartService.incQuantity(user_Id, cocktail_Id);
    }
    @PostMapping("/decQuantity/{user_Id}/{cocktail_Id}")
    public QryResult decQuantity(@PathVariable Long user_Id, @PathVariable Long cocktail_Id){
        return cartService.decQuantity(user_Id, cocktail_Id);
    }


}
