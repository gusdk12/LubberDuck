package com.lec.spring.domain.chat;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

public class ChatHistory {
    private Long user_id;
    @Getter
    private List<String> history = new ArrayList<>();

    public ChatHistory(Long user_id){
        this.user_id = user_id;
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

}
