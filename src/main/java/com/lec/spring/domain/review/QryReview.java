package com.lec.spring.domain.review;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.mypage.Bookmark;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class QryReview extends QryResult {
    @ToString.Exclude
    @JsonProperty("data")
    Review review;
}
