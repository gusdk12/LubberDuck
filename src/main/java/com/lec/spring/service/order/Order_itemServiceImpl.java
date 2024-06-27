package com.lec.spring.service.order;

import com.lec.spring.domain.order.Order;
import com.lec.spring.domain.order.Order_item;
import com.lec.spring.repository.order.Order_ItemRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Order_itemServiceImpl implements Order_itemService {

    @Autowired
    private Order_ItemRepository orderItemRepository;

    @Autowired
    public Order_itemServiceImpl(SqlSession sqlSession){
        orderItemRepository = sqlSession.getMapper(Order_ItemRepository.class);
    }

    @Override
    public List<Order_item> findByOrder(Long order_id) {
        return orderItemRepository.findByOrder(order_id);
    }

    @Override
    public Order_item findById(Long item_id) {
        return orderItemRepository.findById(item_id);
    }

    // 메뉴별 차트 판매량 조회
    @Override
    public List<Order_item> orderMenuChart() {
        return orderItemRepository.findByOrderMenuList();
    }

    @Override
    public List<Order_item> orderMenuAgeChart() {
        return orderItemRepository.findByOrderAgeList();
    }
}
