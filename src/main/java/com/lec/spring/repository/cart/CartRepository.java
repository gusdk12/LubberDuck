package com.lec.spring.repository.cart;

import com.lec.spring.domain.cart.Cart;

import java.util.List;

public interface CartRepository {
    // 특정 유저(user_id) 의 장바구니 목록
    List<Cart> findByUser(Long user_id);

    Cart findByUserAndMenu(Long user_id, Long menu_id);

    int insert(Cart cart);
    int delete(Long user_id, Long menu_id);
    int clear(Long user_id);

    int incQuantity(Long user_id, Long menu_id);
    int decQuantity(Long user_id, Long menu_id);

}
