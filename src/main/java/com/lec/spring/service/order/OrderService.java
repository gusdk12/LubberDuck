package com.lec.spring.service.order;

import com.lec.spring.domain.User;
import com.lec.spring.domain.order.Order;
import com.lec.spring.domain.order.Order_item;

import java.awt.*;
import java.util.List;

public interface OrderService {

    // 특정 사용자의 모든 주문을 조회하는 메서드
    // 새로운 주문을 생성하는 메서드
    void createOrder(Order order);

    // 주문에 항목을 추가하는 메서드
    void addOrderItems(int orderId, List<Order_item> orderItems);

    // 특정 사용자의 모든 주문을 조회하는 메서드
    List<Order> findOrdersByUserId(int userId);
}