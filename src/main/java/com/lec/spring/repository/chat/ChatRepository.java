package com.lec.spring.repository.chat;

import com.lec.spring.domain.chat.Chat;

import java.util.List;

public interface ChatRepository {
    List<Chat> findByUser(Long user_id);

    int insert(Chat chat);

    int deleteByUser(Long userId);
}
