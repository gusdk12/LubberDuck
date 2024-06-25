package com.lec.spring.service.order;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.order.Order;
import com.lec.spring.domain.order.QryOrder;

import java.awt.*;
import java.util.List;

public interface OrderService {

    List<Order> findByUser(Long user_id);

    QryOrder addOrder(Long user_id);

    QryResult addOrderItem(Long order_id, Long menu_id, Integer quantity, Integer price);

}