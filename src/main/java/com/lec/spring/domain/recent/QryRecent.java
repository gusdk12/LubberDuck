package com.lec.spring.domain.recent;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.lec.spring.domain.QryResult;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class QryRecent extends QryResult {
    @ToString.Exclude
    @JsonProperty("data")
    Recent recent;
}
