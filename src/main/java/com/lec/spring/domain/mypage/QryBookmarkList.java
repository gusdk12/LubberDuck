package com.lec.spring.domain.mypage;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.lec.spring.domain.QryResult;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class QryBookmarkList extends QryResult {

    @ToString.Exclude
    @JsonProperty("data")
    List<Bookmark> list;
}
