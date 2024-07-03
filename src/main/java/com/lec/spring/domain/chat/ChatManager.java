package com.lec.spring.domain.chat;

import lombok.Getter;
import lombok.Setter;

// 채팅 프롬프트를 관리하기 위한 매니저 클래스.
@Setter
@Getter
public class ChatManager {
    private static ChatManager instance = null;
    private String bartendarSetting = new String();

    private ChatManager(){}

    public static ChatManager getInstance() {
        if(instance == null)
            instance = new ChatManager();
        return instance;
    }

}
