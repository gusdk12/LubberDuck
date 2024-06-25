package com.lec.spring.controller.pay;

public class PayFormDTO {
    private String user_id;
    private String totalPrice;

    public PayFormDTO(String user_id, String totalPrice) {
        this.user_id = user_id;
        this.totalPrice = totalPrice;
    }

    public String getUser_id() {
        return user_id;
    }

    public String getTotalPrice() {
        return totalPrice;
    }
}
