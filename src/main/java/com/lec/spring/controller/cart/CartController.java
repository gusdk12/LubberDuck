package com.lec.spring.controller.cart;

import com.lec.spring.domain.cart.Cart;
import com.lec.spring.domain.cart.QryCartList;
import com.lec.spring.service.cart.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController   // data 를 response 한다. ('View' 를 리턴하는게 아니다!)
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping("/list/{userId}")
    public QryCartList list(@PathVariable Long userId){
        return cartService.list(userId);
    }

}
