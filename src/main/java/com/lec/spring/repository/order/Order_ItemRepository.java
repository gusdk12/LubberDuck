package com.lec.spring.repository.order;

import com.lec.spring.domain.order.Order_item;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface Order_ItemRepository {

    List<Order_item> findByOrder(Long order_id);

    Order_item findById(Long itemId);

    int insert(Order_item item);
}

