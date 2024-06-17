package com.lec.spring.repository.order;

import com.lec.spring.domain.order.Order;
import com.lec.spring.domain.order.Order_item;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderRepository {
    void insertOrder(Order order);
    void insertOrderItem(Order_item orderItem);

    // 특정 사용자의 모든 주문을 조회하는 메서드
    List<Order> findOrdersByUserId(int userId);
}

