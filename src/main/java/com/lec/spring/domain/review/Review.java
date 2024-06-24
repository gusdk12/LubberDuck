package com.lec.spring.domain.review;


import com.lec.spring.domain.User;
import com.lec.spring.domain.menu.Menu;
import com.lec.spring.domain.order.Order;
import com.lec.spring.domain.order.Order_item;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    private Long id;               // 후기 아이디
    private Long item_id;           // 주문아이템 아이디
    private int rate;              // 별점
    private String content;        // 후기 내용
    private LocalDateTime regdate; //후기 등록일

    @ToString.Exclude
    private Menu menu;  // Menu 객체 포함

    @ToString.Exclude
    private Order order; // Order 객체 포함

    @ToString.Exclude
    private Order_item order_item; // Order_item 객체 포함

    @ToString.Exclude
    private User user;
}
