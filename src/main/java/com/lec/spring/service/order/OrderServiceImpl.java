package com.lec.spring.service.order;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.order.Order;
import com.lec.spring.domain.order.Order_item;
import com.lec.spring.domain.order.QryOrder;
import com.lec.spring.repository.order.OrderRepository;
import com.lec.spring.repository.order.Order_ItemRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private Order_ItemRepository orderItemRepository;

    @Autowired
    public OrderServiceImpl(SqlSession sqlSession){
        orderRepository = sqlSession.getMapper(OrderRepository.class);
        orderItemRepository = sqlSession.getMapper(Order_ItemRepository.class);
    }

    @Override
    public List<Order> findByUser(Long user_id) {
        return orderRepository.findByUser(user_id);
    }

    @Override
    public QryOrder addOrder(Long user_id) {
        Long new_id = (long)(orderRepository.countAll() + 1);

        Order order = Order.builder()
                .id(new_id)
                .user_id(user_id)
                .build();

        int cnt = orderRepository.insert(order);

        QryOrder result = new QryOrder();

        result.setCount(cnt);
        result.setOrder_id(new_id);
        result.setStatus("OK");

        return result;
    }

    @Override
    public QryResult addOrderItem(Long order_id, Long menu_id, Integer quantity, Integer price) {
        Order_item item = Order_item.builder()
                .order_id(order_id)
                .cocktail_id(menu_id)
                .quantity(quantity)
                .price(price)
                .build();

        int cnt = orderItemRepository.insert(item);

        QryResult result = QryResult.builder()
                .count(cnt)
                .status("OK")
                .build();

        return result;
    }
}