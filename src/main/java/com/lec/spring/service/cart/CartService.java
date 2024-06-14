package com.lec.spring.service.cart;

import com.lec.spring.domain.cart.Cart;
import com.lec.spring.domain.cart.QryCartList;

import java.util.List;

public interface CartService {
    // 특정 유저(user_id) 의 카트 목록
    QryCartList list(Long user_id);
}
