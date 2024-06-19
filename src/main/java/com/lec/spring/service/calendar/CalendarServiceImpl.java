package com.lec.spring.service.calendar;

import com.lec.spring.domain.calendar.Calendar;
import com.lec.spring.repository.calendar.CalendarRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalendarServiceImpl implements CalendarService {

    private CalendarRepository calendarRepository;

    @Autowired
    public CalendarServiceImpl(SqlSession sqlSession) {
        calendarRepository = sqlSession.getMapper(CalendarRepository.class);
    }

    @Override
    public List<Calendar> list() {
        return calendarRepository.selectAll();
    }

    public List<Calendar> findByDate(String date) {
        return calendarRepository.findByDate(date);
    }

    @Override
    public Calendar saveMemo(Calendar calendar) {
        calendarRepository.insertMemo(calendar);
        return calendar;
    }

    @Override
    public void updateMemo(Calendar calendar) {
        calendarRepository.updateMemo(calendar);
    }

    @Override
    public void deleteMemo(Long id) {
        calendarRepository.deleteMemo(id);
    }

    @Override
    public Calendar saveComment(Calendar calendar) {
        calendarRepository.insertComment(calendar);
        return calendar;
    }

    @Override
    public void updateComment(Calendar calendar) {
        calendarRepository.updateComment(calendar);
    }

    @Override
    public void deleteComment(String date) {
        calendarRepository.deleteComment(date);
    }

}
