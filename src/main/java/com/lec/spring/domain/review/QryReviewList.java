package com.lec.spring.domain.review;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.mypage.Bookmark;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class QryReviewList extends QryResult {

    @ToString.Exclude
    @JsonProperty("data")
    List<Review> list;
}
