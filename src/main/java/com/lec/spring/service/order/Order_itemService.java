package com.lec.spring.service.order;

import com.lec.spring.domain.order.Order;
import com.lec.spring.domain.order.Order_item;

import java.util.List;

public interface Order_itemService {

    List<Order_item> findByOrder(Long order_id);


    Order_item findById(Long item_id);

    // 메뉴별 주문 수량 조회
    List<Order_item> orderMenuChart();

    // 연령별 메뉴 주문 수량 조회
    List<Order_item> orderMenuAgeChart();
}