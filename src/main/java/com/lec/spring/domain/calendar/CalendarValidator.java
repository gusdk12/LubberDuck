package com.lec.spring.domain.calendar;

import com.lec.spring.service.calendar.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

@Component
public class CalendarValidator implements Validator {

    @Autowired
    CalendarService calendarService;

    @Override
    public boolean supports(Class<?> clazz) {
        return Calendar.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Calendar calendar = (Calendar) target;

        // date 필수 검증
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "date", "date.required", "날짜는 필수입니다.");

        // memo 필수 검증
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "memo", "memo.required", "메모를 입력하세요.");

    }
}
