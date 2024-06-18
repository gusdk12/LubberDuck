package com.lec.spring.domain.mypage;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.lec.spring.domain.QryResult;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class QryBookmark extends QryResult {
    @ToString.Exclude
    @JsonProperty("data")
    Bookmark bookmark;
}
