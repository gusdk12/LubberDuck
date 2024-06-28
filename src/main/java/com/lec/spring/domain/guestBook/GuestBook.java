package com.lec.spring.domain.guestBook;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GuestBook {
    private Long id;    // PK
    private Long user_id;   // FK
    private String nickname; // 유저 닉네임
    private Double x_coordinate;   // x좌표
    private Double y_coordinate;   // y좌표
    private Long z_coordinate;     // z좌표
    private String content; // 게시판 내용
    private Integer postItKind;  // 포스트잇 종류
}
