package com.lec.spring.domain.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemChart {
    private long ageGroup;   // 연령별 그룹
    private long totalQuantity; // 메뉴별 총 판매량
    private String menuName;    // 메뉴 이름
    private String menuImage;   // 메뉴 이미지
}
