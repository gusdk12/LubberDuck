package com.lec.spring.repository.calendar;

import com.lec.spring.domain.calendar.Calendar;

import java.util.List;

public interface CalendarRepository {

    List<Calendar> selectAll();

    List<Calendar> findByDate(String date);

    void insertMemo(Calendar calendar);

    void updateMemo(Calendar calendar);

    void deleteMemo(Long id);

    void insertComment(Calendar calendar);

    void updateComment(Calendar calendar);

    void deleteComment(String date);
}
