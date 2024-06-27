package com.lec.spring.domain.order;


import com.lec.spring.domain.menu.Menu;
import com.lec.spring.domain.review.Review;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {

    private Long id;
    private Long order_id; // 주문 아이디
    private Long cocktail_id; // 칵테일 아이디
    private int quantity; // 수량
    private Integer price; // 주문 당시 가격

    private Integer rate; // 별점

    private Double avgRate; // 평균 별점

    @ToString.Exclude
    private Menu menu;  // Menu 객체 포함

    @ToString.Exclude
    private Order order;  // Order 객체 포함

    @ToString.Exclude
    private Review review; // Review 객체 포함
}
