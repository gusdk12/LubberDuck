package com.lec.spring.repository.order;

import com.lec.spring.domain.order.Order;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderRepository {

    List<Order> findByUser(Long user_id);

    int countAll();
    int insert(Order order);

}

