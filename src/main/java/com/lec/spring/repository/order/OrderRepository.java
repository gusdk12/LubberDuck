package com.lec.spring.repository.order;

import com.lec.spring.domain.order.Order;
import com.lec.spring.domain.review.Review;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderRepository {

    List<Order> findByUser(Long user_id);

    int countAll();

    int cntAll(Long user_id);
    int insert(Order order);

    List<Order> selectFromOrder (Long user_id, int from, int rows);
}

