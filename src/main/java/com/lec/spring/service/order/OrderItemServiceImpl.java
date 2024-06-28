package com.lec.spring.service.order;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.order.OrderItem;
import com.lec.spring.domain.order.QryOrderItem;
import com.lec.spring.repository.order.OrderItemRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    public OrderItemServiceImpl(SqlSession sqlSession){
        orderItemRepository = sqlSession.getMapper(OrderItemRepository.class);
    }

    @Override
    public List<OrderItem> findByOrder(Long order_id) {
        return orderItemRepository.findByOrder(order_id);
    }

    @Override
    public OrderItem findById(Long item_id) {
        return orderItemRepository.findById(item_id);
    }

    // 메뉴별 차트 판매량 조회
    @Override
    public List<OrderItem> orderMenuChart() {
        return orderItemRepository.findByOrderMenuList();
    }

    @Override
    public List<OrderItem> orderMenuAgeChart() {
        return orderItemRepository.findByOrderAgeList();
    }

    @Override
    public QryResult findByRate(Long cocktail_id) {
        QryOrderItem qryOrderItem = new QryOrderItem();

        OrderItem orderItem = orderItemRepository.findByRate(cocktail_id);

        if (orderItem != null) {
            qryOrderItem.setCount(1);
            qryOrderItem.setOrderItem(orderItem);
            qryOrderItem.setStatus("OK");
        } else {
            qryOrderItem.setCount(0);
            qryOrderItem.setOrderItem(orderItem);
            qryOrderItem.setStatus("OK");
        }

        return qryOrderItem;
    }
}
