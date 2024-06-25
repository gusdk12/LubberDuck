package com.lec.spring.repository.calendar;

import com.lec.spring.domain.calendar.Calendar;

import java.util.List;

public interface CalendarRepository {

    // 모든 일정 불러오기 list
    List<Calendar> selectAll();

    // 특정 날짜 불러오기
    Calendar findById(Long id);

    // 특정 날짜에 아무 데이터도 없을 때 메모 추가 addByMemo
    int insertByMemo(Calendar calendar);

    // 특정 날짜에 아무 데이터도 없을 때 오늘의 메뉴 추가 addByMenu
    int insertByMenu(Calendar calendar);

    // 캘린더 데이터(메모, 오늘의 메뉴) 수정
    int updateCalendar(Calendar calendar);

    int updateToDeleteMemo(Calendar calendar);

    int updateToDeleteMenu(Calendar calendar);

    // 캘린더 데이터 삭제 (전체 삭제)
    int deleteById(Long calendarId);
}
