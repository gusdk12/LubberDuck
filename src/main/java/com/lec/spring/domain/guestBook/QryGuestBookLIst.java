package com.lec.spring.domain.guestBook;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.cart.Cart;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class QryGuestBookLIst extends QryResult {

    @ToString.Exclude
    @JsonProperty("data")
    List<GuestBook> guestBookList;
}
