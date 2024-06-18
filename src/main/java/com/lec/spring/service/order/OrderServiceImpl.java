package com.lec.spring.service.order;

import com.lec.spring.domain.order.Order;
import com.lec.spring.domain.order.Order_item;
import com.lec.spring.repository.UserRepository;
import com.lec.spring.repository.cart.CartRepository;
import com.lec.spring.repository.menu.MenuRepository;
import com.lec.spring.repository.order.OrderRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    public OrderServiceImpl(SqlSession sqlSession){
        orderRepository = sqlSession.getMapper(OrderRepository.class);
    }


    @Override
    public List<Order> findByUser(Long user_id) {
        return orderRepository.findByUser(user_id);
    }
}