package com.lec.spring.domain.manager;

import com.lec.spring.domain.calendar.Calendar;
import com.lec.spring.domain.menu.Menu;
import com.lec.spring.domain.order.OrderItem;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;


@Component
public class ManagerValidator implements Validator {

    private static final int MAX_COMMENT_LENGTH = 400; // 오늘의 메뉴 comment 최대 글자 수

    @Override
    public boolean supports(Class<?> clazz) {
        // Menu, Calender 클래스 각각지원
        return Menu.class.isAssignableFrom(clazz) || Calendar.class.isAssignableFrom(clazz) || OrderItem.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        // 각 클래스에 따른 유효성 검사 로직을 구현
        if (target instanceof Menu) {
            validateMenu((Menu) target, errors);
        } else if (target instanceof Calendar) {
            validateCalendar((Calendar) target, errors);
        }
    }

    private void validateMenu(Menu menu, Errors errors) {

        System.out.println("validate() 호출" + menu);
        // update 유효성 검사
        try {
            int price = menu.getPrice();
            if (price < 0) {
                errors.rejectValue("price", "칵테일 가격은 0 이상으로 입력해주세요");
            }
        } catch (NullPointerException e) {
            errors.rejectValue("price", "칵테일 가격은 필수입니다");
        }

        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "info", "칵테일 소개 내용은 필수입니다");
    }

    private void validateCalendar(Calendar calendar, Errors errors) {
        if (calendar.getComment() != null && calendar.getComment().length() > MAX_COMMENT_LENGTH) {
            errors.rejectValue("comment", "comment.length", "최대 " + MAX_COMMENT_LENGTH + "자까지 입력 가능합니다.");
        }
    }
}
