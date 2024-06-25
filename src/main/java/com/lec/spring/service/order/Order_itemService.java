package com.lec.spring.service.order;

import com.lec.spring.domain.order.Order;
import com.lec.spring.domain.order.Order_item;

import java.util.List;

public interface Order_itemService {

    List<Order_item> findByOrder(Long order_id);


    Order_item findById(Long item_id);

    List<Order_item> orderList();
}