package com.lec.spring.domain.chat;

import com.lec.spring.service.chat.ChatServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

// 채팅 프롬프트를 관리하기 위한 매니저 클래스.
public class ChatManager {
    private static ChatManager instance = null;
    private String bartendarSetting = new String();
    private List<String> history = new ArrayList<>();

    private ChatManager(){}

    public static ChatManager getInstance() {
        if(instance == null)
            instance = new ChatManager();
        return instance;
    }

    public void addInitSetting(String setting) {
        bartendarSetting = setting;
    }

    public void addHistory(String role, String message) {
        history.add(role + ": " + message);
    }

    public void makeHistory(List<Chat> chatList){
        history.clear();
        for(int i = chatList.size()-1; i >= 0; --i){
            Chat chat = chatList.get(i);
            history.add(chat.getRole() + ": " + chat.getContent());
        }
    }
    public String getHistory() {
        String result = bartendarSetting + "지금까지의 대화 기록입니다. 대화기록을 확인하고, 적절한 대화를 이어가세요. - " +String.join(" ", history);
        return result;
    }
}
