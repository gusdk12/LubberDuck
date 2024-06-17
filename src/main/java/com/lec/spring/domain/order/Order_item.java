package com.lec.spring.domain.order;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order_item {

    private int id;
    private int order_id; // 주문 아이디
    private int cocktail_id; // 칵테일 아이디
    private int quantity; // 수량
    private Integer price; // 주문 당시 가격
}
