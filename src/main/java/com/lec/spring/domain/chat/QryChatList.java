package com.lec.spring.domain.chat;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.menu.Menu;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class QryChatList extends QryResult {

    @ToString.Exclude
    @JsonProperty("data")
    List<Chat> list;

    @ToString.Exclude
    @JsonProperty("menudata")
    List<Menu> menuList;
}
