package com.lec.spring.domain.order;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.cart.Cart;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class QryOrderItem extends QryResult {
    @ToString.Exclude
    @JsonProperty("data")
    OrderItem orderItem;
}
