package com.lec.spring.domain.mypage;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class QryBookmarkList {

    @ToString.Exclude
    @JsonProperty("data")
    List<Bookmark> list;
}
