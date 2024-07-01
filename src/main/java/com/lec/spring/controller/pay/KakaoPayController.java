package com.lec.spring.controller.pay;

import com.lec.spring.service.pay.KakaoPayService;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@Log
public class KakaoPayController {

    @Setter(onMethod_ = @Autowired)
    private KakaoPayService kakaoPay;

    @GetMapping("/kakaoPay")
    public void kakaoPayGet() {

    }

    @PostMapping("/kakaoPay")
    public String kakaoPay(PayFormDTO form){
        log.info("kakaoPay post.....................");

        return "redirect:" + kakaoPay.kakaoPayReady(form);
    }

    @GetMapping("/kakaoPaySuccess")
    public void kakaoPaySuccess(@RequestParam("pg_token")String pg_token, Model model) {
        log.info("kakaoPay Success get................");
        log.info("kakaoPaySuccess pg_token : " + pg_token);
    }

    @GetMapping("/kakaoPayCancle")
    public String kakaoPayCancle(){
        return "redirect:/pay/list";
    }
}