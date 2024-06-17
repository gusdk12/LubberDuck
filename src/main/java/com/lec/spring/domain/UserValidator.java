package com.lec.spring.domain;


import com.lec.spring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

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
        } else if (userService.isExist(username)){
            errors.rejectValue("username", "이미 존재하는 아이디 입니다.");
        }

        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "username", "username 은 필수입니다");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "password 는 필수입니다");

        // email
        String email = user.getEmail();
        if (email != null && !email.trim().isEmpty()) {
            if (!isValidEmail(email)) {
                errors.rejectValue("email", "유효한 이메일 주소를 입력해주세요.");
            }
        }



        // 입력 password, re_password 가 동일한지 비교
        if(!user.getPassword().equals(user.getRe_password())){
            errors.rejectValue("re_password", "비밀번호와 비밀번호 확인 입력 값은 같아야 합니다.");
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

}
