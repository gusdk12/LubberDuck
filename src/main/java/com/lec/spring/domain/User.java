package com.lec.spring.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    private Long id;
    private String username; // 회원 아이디
    @JsonIgnore
    private String password; // 회원 비밀번호

    @ToString.Exclude // toSting()에서 제외.
    @JsonIgnore
    private String re_password; // 비밀번호 확인 입력

    private String nickname; // 회원 닉네임
    private String email; // 이메일
    private LocalDate birth_date;

    private int year;
    private int month;
    private int day;

    @JsonIgnore
    private LocalDateTime regDate;

    //@Singular
    @ToString.Exclude
    private Long authority_id;
    //@EqualsAndHashCode.Exclude
    //private Set<Authority> authorities = new HashSet<>(); // 권한 목록
}