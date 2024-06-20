package com.lec.spring.service.calendar;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.calendar.Calendar;
import com.lec.spring.domain.calendar.QryCalendarList;

import java.util.List;

public interface CalendarService {

    // 모든 일정 불러오기
    QryCalendarList list();

    // 특정 날짜의 메모 조회
    Calendar findByDate(String date);

    // 특정 날짜에 메모 추가
    QryResult addByMemo(String memo, String date);

    // 캘린더 데이터(메모, 오늘의 메뉴) 수정
    QryResult update(Long calendarId, String memo);

}
