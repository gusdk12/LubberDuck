package com.lec.spring.domain.order;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    private int id;
    private int user_id; // 유저 아이디
    private int number; // 주문 묶는 번호
    private LocalDateTime regdate; // 주문 일시
}
