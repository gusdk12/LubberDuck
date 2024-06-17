package com.lec.spring.domain.mypage;

import com.lec.spring.domain.menu.Menu;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bookmark {
    private Long user_id; // 해당 유저 (PK)

    @ToString.Exclude
    private Menu menu; //칵테일 아이디 (FK)

    private String comment; // 즐겨찾기 코멘트
}
