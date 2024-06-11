package com.lec.spring.domain.menu;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Menu {

    private Long id;
    private String name; // 칵테일 이름
    private String imgUrl; // 이메일 url
    private String info; // 칵테일 정보
    private Integer price; // 칵테일 가격
    private Integer sequence; // 순서

}
