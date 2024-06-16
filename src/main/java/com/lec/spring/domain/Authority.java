package com.lec.spring.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import java.util.HashSet;
import java.util.Set;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Authority {
    private Long id;
    private String name;

}
