package com.lec.spring.domain.review;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    private Long id;               // 후기 아이디
    private int item_id;           // 주문아이템 아이디
    private int rate;              // 별점
    private String content;        // 후기 내용
    private LocalDateTime regDate; //후기 등록일

}
