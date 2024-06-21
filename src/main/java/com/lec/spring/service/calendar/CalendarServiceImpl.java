package com.lec.spring.service.calendar;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.calendar.Calendar;
import com.lec.spring.domain.calendar.QryCalendarList;
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

    // 모든 일정 불러오기
    @Override
    public QryCalendarList list() {
        QryCalendarList list = new QryCalendarList();

        List<Calendar> calendars = calendarRepository.selectAll();

        list.setCount(calendars.size());
        list.setList(calendars);
        list.setStatus("OK");

        return list;
    }

    // 특정 날짜의 메모 조회
    public Calendar findByDate(String date) {
        Calendar calendar = calendarRepository.findByDate(date);
        return calendar;
    }

    // 특정 날짜에 메모 추가
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

    // 캘린더 데이터(메모, 오늘의 메뉴) 수정
    @Override
    public QryResult update(Long calendarId, String memo) {
        Calendar calendar = Calendar.builder()
                .id(calendarId)
                .memo(memo)
                .build();

        int cnt = calendarRepository.updateCalendar(calendar);

        QryResult result = QryResult.builder()
                .count(cnt)
                .status("OK")
                .build();

        return result;
    }

    // 캘린더 데이터가 비어있지 않을 때 메모만 삭제
    @Override
    public QryResult updateToDeleteMemo(Long calendarId, String memo) {
        Calendar calendar = Calendar.builder()
                .id(calendarId)
                .memo(memo)
                .build();

        int cnt = calendarRepository.updateToDeleteMemo(calendarId, memo);

        QryResult result = QryResult.builder()
                .count(cnt)
                .status("OK")
                .build();

        return result;
    }

    // 캘린더 데이터가 비어있지 않을 때 오늘의 메뉴 코멘트만 삭제
    @Override
    public QryResult updateToDeleteMenu(Long calendarId, String comment) {
        Calendar calendar = Calendar.builder()
                .id(calendarId)
                .comment(comment)
                .build();

        int cnt = calendarRepository.updateToDeleteMenu(calendarId, comment);

        QryResult result = QryResult.builder()
                .count(cnt)
                .status("OK")
                .build();

        return result;
    }

    // 캘린더 데이터 삭제 (전체 삭제)
    @Override
    public QryResult deleteById(Long calendarId) {
        Calendar calendar = Calendar.builder()
                .id(calendarId)
                .build();

        int cnt = calendarRepository.deleteById(calendarId);

        QryResult result = QryResult.builder()
                .count(cnt)
                .status("OK")
                .build();

        return result;
    }
}
