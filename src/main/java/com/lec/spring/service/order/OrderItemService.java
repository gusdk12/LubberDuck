package com.lec.spring.service.order;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.order.OrderItem;

import java.util.List;

public interface OrderItemService {

    List<OrderItem> findByOrder(Long order_id);


    OrderItem findById(Long item_id);

    // 메뉴별 주문 수량 조회
    List<OrderItem> orderMenuChart();

    // 연령별 메뉴 주문 수량 조회
    List<OrderItem> orderMenuAgeChart();

    // 칵테일 id 별 평점
    QryResult findByRate(Long cocktail_id);
}