package com.lec.spring.service.calendar;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.User;
import com.lec.spring.domain.calendar.Calendar;
import com.lec.spring.domain.calendar.QryCalendarList;
import com.lec.spring.domain.cart.Cart;
import com.lec.spring.domain.cart.QryCartList;
import com.lec.spring.domain.menu.Menu;
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
    public QryCalendarList list() {
        QryCalendarList list = new QryCalendarList();

        List<Calendar> calendars = calendarRepository.selectAll();

        list.setCount(calendars.size());
        list.setList(calendars);
        list.setStatus("OK");

        return list;
    }

    @Override
    public QryResult addByMemo(String memo, String date) {
        Calendar calendar = Calendar.builder()
                .memo(memo)
                .date(date)
                .build();

        int cnt = calendarRepository.insertByMemo(calendar);

        QryResult result = QryResult.builder()
                .count(cnt)
                .status("OK")
                .build();

        return result;
    }

    public List<Calendar> findByDate(String date) {
        List<Calendar> temp = calendarRepository.findByDate(date);
        return temp;
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
