package com.lec.spring.domain;


import com.lec.spring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.regex.Pattern;

@Component
public class UserValidator implements Validator {

    @Autowired
    UserService userService;

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {

        User user = (User)target;

        String username = user.getUsername();
        if(username == null || username.trim().isEmpty()){
            errors.rejectValue("username","username 는 필수입니다.");
        } else if (!isValidUsername(username)) {
            errors.rejectValue("username", "아이디는 영문 또는 숫자로 5글자 이상이여야 합니다.");
        } else if (userService.isExist(username)){
            errors.rejectValue("username", "이미 존재하는 아이디 입니다.");
        }

        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "username", "username 은 필수입니다");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "password 는 필수입니다");


        String password = user.getPassword();
        if (password == null || password.trim().isEmpty()) {
            errors.rejectValue("password", "password 는 필수입니다.");
        } else if (!isValidPassword(password)) {
            errors.rejectValue("password", "password 는 6글자 이상이어야 하며, 숫자 및 특수문자 1개를 포함해야 합니다.");
        }

        // 입력 password, re_password 가 동일한지 비교
        if(!user.getPassword().equals(user.getRe_password())){
            errors.rejectValue("re_password", "비밀번호와 비밀번호 확인 입력 값은 같아야 합니다.");
        }

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
                errors.rejectValue("year", "만 19세 이상만 가입할 수 있습니다.");
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

    // 사용자 이름
    private boolean isValidUsername(String username) {
        String usernameRegex = "^[a-zA-Z0-9]{5,}$";
        Pattern pat = Pattern.compile(usernameRegex);
        if (username == null) {
            return false;
        }
        return pat.matcher(username).matches();
    }


    // 비밀번호
    private boolean isValidPassword(String password) {
        // 비밀번호는 6글자 이상이어야 하며, 영문자와 숫자 또는 특수문자를 포함해야 함
        String passwordRegex = "^(?=.*[a-zA-Z])(?=.*[\\d@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$";
        Pattern pat = Pattern.compile(passwordRegex);
        if (password == null) {
            return false;
        }
        return pat.matcher(password).matches();
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
