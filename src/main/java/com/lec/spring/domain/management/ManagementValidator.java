package com.lec.spring.domain.management;

import com.lec.spring.domain.menu.Menu;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

public class ManagementValidator implements Validator {
  @Override
  public boolean supports(Class<?> clazz) {
    boolean result = Menu.class.isAssignableFrom(clazz);
    return result;
  }

  @Override
  public void validate(Object target, Errors errors) {
    Menu menu = (Menu) target;
    System.out.println("validate() 호출" + menu);

    try {
      int price = menu.getPrice();
      if (price < 0) {
        errors.rejectValue("price", "칵테일 가격은 0 이상으로 입력해주세요");
      }
    } catch (NullPointerException e){
      errors.rejectValue("price", "칵테일 가격은 필수입니다");
    }


    ValidationUtils.rejectIfEmptyOrWhitespace(errors, "info", "칵테일 소개 내용은 필수입니다");
  }
}
