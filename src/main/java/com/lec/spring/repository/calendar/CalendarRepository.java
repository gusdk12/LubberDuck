package com.lec.spring.repository.calendar;

import com.lec.spring.domain.calendar.Calendar;

import java.util.List;

public interface CalendarRepository {

    // 모든 일정 불러오기 list
    List<Calendar> selectAll();

    // 특정 날짜의 메모 조회 findByDate
    Calendar findByDate(String date);

    // 특정 날짜에 메모 추가 addByMemo
    int insertByMemo(Calendar calendar);

    // 캘린더 데이터(메모, 오늘의 메뉴) 수정
    int updateCalendar(Calendar calendar);
}
