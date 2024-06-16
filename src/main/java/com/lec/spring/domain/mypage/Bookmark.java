package com.lec.spring.domain.mypage;

import com.lec.spring.domain.User;
import com.lec.spring.domain.menu.Menu;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bookmark {
    private Long id; // PK : 즐겨찾기 id

    private Long user_id; // 해당 유저 (FK)

    private Menu ctId; //칵테일 아이디 (FK)

    private String comment; // 즐겨찾기 코멘트
}
