package com.lec.spring.service.order;

import com.lec.spring.domain.order.Order;
import com.lec.spring.domain.order.Order_item;
import com.lec.spring.repository.order.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;


    @Override
    @Transactional
    public void createOrder(Order order) {
        // Order 삽입
        orderRepository.insertOrder(order);
    }

    @Override
    @Transactional
    public void addOrderItems(int orderId, List<Order_item> orderItems) {
        // OrderItems 삽입
        for (Order_item item : orderItems) {
            item.setOrder_id(orderId);  // 해당 order의 ID를 설정
            orderRepository.insertOrderItem(item);
        }
    }

    @Override
    public List<Order> findOrdersByUserId(int userId) {
        // 특정 사용자의 모든 주문을 조회
        return orderRepository.findOrdersByUserId(userId);
    }
}