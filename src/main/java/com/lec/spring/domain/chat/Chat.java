package com.lec.spring.domain.chat;

import java.util.ArrayList;
import java.util.List;

public class Chat {
    private String bartendarSetting = new String();
    private List<String> history = new ArrayList<>();

    public void addInitSetting(String setting) {
        bartendarSetting = setting;
    }
    public void addMessage(String role, String message) {
        history.add(role + ": " + message);
        if(history.size() > 30){
            history.remove(0);
        }
    }

    public String getHistory() {
        String result = bartendarSetting + String.join("", history);
        return result;
    }

    public void clearHistory() {
        history.clear();
    }
}
