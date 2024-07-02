package com.lec.spring.domain.chat;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

// 채팅 프롬프트를 관리하기 위한 매니저 클래스.
public class ChatManager {
    private static ChatManager instance = null;
    private String bartendarSetting = new String();
    private Map<Long, ChatHistory> userChatHistories = new HashMap();

    private ChatManager(){}

    public static ChatManager getInstance() {
        if(instance == null)
            instance = new ChatManager();
        return instance;
    }

    public void addInitSetting(String setting) {
        bartendarSetting = setting;
    }

    public void addUserHistory(Long user_id, String role, String message) {
        if(!userChatHistories.containsKey(user_id))
            userChatHistories.put(user_id, new ChatHistory(user_id));
        userChatHistories.get(user_id).addHistory(role, message);
    }

    public void makeUserHistory(Long user_id, List<Chat> chatList){
        if(!userChatHistories.containsKey(user_id))
            userChatHistories.put(user_id, new ChatHistory(user_id));
        userChatHistories.get(user_id).makeHistory(chatList);
    }

    public String getUserHistory(Long user_id) {
        String result = bartendarSetting +
                "지금까지의 대화 기록입니다. 대화기록을 확인하고, 적절한 대화를 이어가세요. - "
                + String.join(" ", userChatHistories.get(user_id).getHistory());
        return result;
    }
}
