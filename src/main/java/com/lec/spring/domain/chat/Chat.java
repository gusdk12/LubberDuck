package com.lec.spring.domain.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Chat {
    private Long id; // PK

    private Long user_id; // FK

    private String role;
    private String content;
}
