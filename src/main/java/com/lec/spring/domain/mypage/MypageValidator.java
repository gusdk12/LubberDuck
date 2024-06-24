package com.lec.spring.domain.mypage;


import com.lec.spring.domain.User;
import com.lec.spring.domain.order.Order_item;
import com.lec.spring.domain.review.Review;
import com.lec.spring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.util.regex.Pattern;

@Component
public class MypageValidator implements Validator {

    @Autowired
    UserService userService;

    @Override
    public boolean supports(Class<?> clazz) {
        boolean assignableFrom = User.class.isAssignableFrom(clazz)
                || Order_item.class.isAssignableFrom(clazz)
                || Review.class.isAssignableFrom(clazz);
        return assignableFrom;
    }


    @Override
    public void validate(Object target, Errors errors) {
        if(Order_item.class.isAssignableFrom(target.getClass())) return;
        if(Review.class.isAssignableFrom(target.getClass())) return;

        validateUser((User) target, errors);
    }

    private void validateUser(User user, Errors errors) {
        // 이메일 유효성 검사
        String email = user.getEmail();
        if (email == null || email.trim().isEmpty() || !isValidEmail(email)) {
            errors.rejectValue("email", "유효한 이메일 주소를 입력해주세요.");
        }

        // 생년월일 유효성 검사
        if (!isValidDate(user.getYear(), user.getMonth(), user.getDay())) {
            errors.rejectValue("year", "올바른 날짜를 입력해세요");
        } else if (!isOver18(user)) {
            errors.rejectValue("year", "만 19세 이상으로만 수정 가능합니다.");
        }
    }

    private boolean isValidEmail(String email) {
        if (email == null || email.isEmpty()) {
            return false;
        }
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        Pattern pat = Pattern.compile(emailRegex);
        return pat.matcher(email).matches();
    }

    private boolean isValidDate(int year, int month, int day) {
        try {
            LocalDate.of(year, month, day);
            return true;
        } catch (DateTimeException e) {
            return false;
        }
    }

    private boolean isOver18(User user) {
        LocalDate birthDate = LocalDate.of(user.getYear(), user.getMonth(), user.getDay());
        if (birthDate == null) {
            return false;
        }
        LocalDate today = LocalDate.now();
        return birthDate.plusYears(19).isBefore(today) || birthDate.plusYears(19).isEqual(today);
    }
}
