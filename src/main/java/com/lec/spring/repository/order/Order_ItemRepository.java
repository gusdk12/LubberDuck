package com.lec.spring.repository.order;

import com.lec.spring.domain.order.Order;
import com.lec.spring.domain.order.Order_item;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface Order_ItemRepository {

    List<Order_item> findByOrder(Long order_id);

    Order_item findById(Long itemId);

    // 주문한 메뉴 리스트 조회
    List<Order_item> findByOrderMenuList();

    // 연령별로 주문한 메뉴 조회
    List<Order_item> findByOrderAgeList();

    int insert(Order_item item);
}

