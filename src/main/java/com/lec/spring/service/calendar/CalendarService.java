package com.lec.spring.service.calendar;

import com.lec.spring.domain.calendar.Calendar;

import java.util.List;

public interface CalendarService {

    List<Calendar> list();

    List<Calendar> findByDate(String date);

    Calendar saveMemo(Calendar calendar);

    void updateMemo(Calendar calendar);

    void deleteMemo(Long id);

    Calendar saveComment(Calendar calendar);

    void updateComment(Calendar calendar);

    void deleteComment(String date);
}
