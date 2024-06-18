package com.lec.spring.domain.mypage;


import com.lec.spring.domain.User;
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
        return User.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {

        User user = (User)target;


        // email
        String email = user.getEmail();
        if (email != null && !email.trim().isEmpty()) {
            if (!isValidEmail(email)) {
                errors.rejectValue("email", "유효한 이메일 주소를 입력해주세요.");
            }
        }


        // 생년월일 유효성 검사
        try {
            LocalDate birthDate = LocalDate.of(user.getYear(), user.getMonth(), user.getDay());

            if(!isValidDate(user.getYear(), user.getMonth(), user.getDay())){
                errors.rejectValue("year", "올바른 날짜를 입력해세요");
            } else if (!isOver18(birthDate)) {
                errors.rejectValue("year", "만 19세 이상으로만 수정 가능합니다.");
            }
        } catch (Exception e) {
            errors.rejectValue("year", "올바른 생년월일을 입력해주세요.");
        }

    }



    // 이메일 유효성 검사 메서드
    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        Pattern pat = Pattern.compile(emailRegex);
        if (email == null)
            return false;
        return pat.matcher(email).matches();
    }


    private boolean isValidDate(int year, int month, int day){
        try {
            LocalDate.of(year, month, day);
            return true;
        } catch (DateTimeException e){
            return false;
        }
    }

    // 생년월일 유효성 검사 메서드 (만 19세 이상 여부 확인)
    private boolean isOver18(LocalDate birthDate) {
        LocalDate today = LocalDate.now();
        return birthDate.plusYears(19).isBefore(today);
    }

}
