package com.lec.spring.controller.order;


import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.order.QryOrder;
import com.lec.spring.service.order.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController   // data 를 response 한다. ('View' 를 리턴하는게 아니다!)
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/addOrder/{user_id}")
    public QryOrder addOrder(@PathVariable Long user_id){
        return orderService.addOrder(user_id);
    }

    @PostMapping("/addOrderItem")
    public QryResult addOrderItem(
            @RequestParam("order_id") Long order_id,
            @RequestParam("menu_id") Long menu_id,
            @RequestParam("quantity") Integer quantity,
            @RequestParam("price") Integer price){
        return orderService.addOrderItem(order_id, menu_id, quantity, price);
    }

}
