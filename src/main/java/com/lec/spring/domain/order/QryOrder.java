package com.lec.spring.domain.order;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.lec.spring.domain.QryResult;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class QryOrder extends QryResult {
    @ToString.Exclude
    @JsonProperty("order_id")
    Long order_id;
}
