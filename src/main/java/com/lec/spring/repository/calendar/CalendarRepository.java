package com.lec.spring.repository.calendar;

import com.lec.spring.domain.calendar.Calendar;

public interface CalendarRepository {

    Calendar findMemoById(Long id);

    int insertMemoById(Calendar calendar);

    int deleteMemoById(Long id);

    int insertCommentById(Calendar calendar);

    int updateCommentById(Calendar calendar);

    int deleteCommentById(Long id);
}
