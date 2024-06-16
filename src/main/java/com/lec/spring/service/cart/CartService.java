package com.lec.spring.service.cart;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.cart.QryCartList;

public interface CartService {
    // 특정 유저(user_id) 의 카트 목록
    QryCartList findByUser(Long user_id);

    QryResult findByUserAndMenu(Long user_id, Long cocktail_Id);

    QryResult add(Long user_id, Long menu_Id, Integer quantity);
    QryResult delete(Long user_id, Long cocktail_Id);

    QryResult incQuantity(Long user_id, Long cocktail_Id);
    QryResult decQuantity(Long user_id, Long cocktail_Id);

}
