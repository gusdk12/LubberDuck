package com.lec.spring.domain.calendar;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Calendar {
    private Long id;
    private String memo; // 일정 메모
    private String comment; // 관리자 코멘트
    private String date; // 날짜
}
