package com.lec.spring.domain.calendar;

import com.lec.spring.domain.menu.Menu;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Calendar {
    private Long id;

    private Long menu_id; // FK

    @ToString.Exclude
    private Menu menu;

    private String memo; // 일정 메모
    private String comment; // 관리자 코멘트
    private String date; // 날짜
}
