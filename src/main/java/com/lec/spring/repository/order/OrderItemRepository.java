package com.lec.spring.repository.order;

import com.lec.spring.domain.order.OrderItem;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface OrderItemRepository {

    List<OrderItem> findByOrder(Long order_id);

    OrderItem findById(Long itemId);

    // 주문한 메뉴 리스트 조회
    List<OrderItem> findByOrderMenuList();

    // 연령별로 주문한 메뉴 조회
    List<OrderItem> findByOrderAgeList();

    int insert(OrderItem item);

    // 별점
    OrderItem findByRate(Long cocktail_id);
}

