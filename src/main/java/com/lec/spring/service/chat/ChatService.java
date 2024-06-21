package com.lec.spring.service.chat;


import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.chat.QryChatList;
import com.lec.spring.domain.menu.Menu;

import java.util.List;

public interface ChatService {
    QryChatList findByUser(Long user_id, List<Menu> menuList);

    QryResult add(Long userId, String role, String content);

    QryResult clear(Long userId);
}
