package com.lec.spring.domain.order;


import com.lec.spring.domain.menu.Menu;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order_item {

    private Long id;
    private Long order_id; // 주문 아이디
    private Long cocktail_id; // 칵테일 아이디
    private int quantity; // 수량
    private Integer price; // 주문 당시 가격

    @ToString.Exclude
    private Menu menu;  // Menu 객체 포함

    @ToString.Exclude
    private Order order;  // Menu 객체 포함
}
