package com.lec.spring.domain.cart;

import com.lec.spring.domain.User;
import com.lec.spring.domain.menu.Menu;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cart {
    private Long user_id;   // PK
    private Long menu_id;   // PK

    @ToString.Exclude
    private User user;
    @ToString.Exclude
    private Menu menu;

    private Integer quantity;
}
