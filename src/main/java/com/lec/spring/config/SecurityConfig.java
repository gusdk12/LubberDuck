package com.lec.spring.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public PasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }

    // ↓ Security 동작 시키지 않기. 동작 시키게 하면, 모든 페이지에서 security가 동작하게된다. 그걸 막는 역할
    //  그러나 이걸 막으면, default로 초기화되던 Authentication가 초기화되지 않는다. 이 점 주의
//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer(){
//        return web -> web.ignoring().anyRequest();   // 어떠한 request 도 Security 가 무시함.
//    }

    // ↓ SecurityFilterChain 을 Bean 으로 등록해서 사용
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth // TODO
                        .anyRequest().permitAll()
                )
                .formLogin(form -> form  // TODO
                        .loginPage("/user/login")
                        .loginProcessingUrl("/user/login").defaultSuccessUrl("/")
                        .successHandler(new CustomLoginSuccessHandler("/home"))
                        .failureHandler(new CustomLoginFailureHandler())

                )
                .logout(httpSecurityLogoutConfigurer -> httpSecurityLogoutConfigurer
                        .logoutUrl("/user/logout")
                        .invalidateHttpSession(false)
                        .logoutSuccessHandler(new CustomLogoutSuccessHandler())
                )
                .exceptionHandling(httpSecurityExceptionHandlingConfigurer -> httpSecurityExceptionHandlingConfigurer
                        .accessDeniedHandler(new CustomAccessDeniedHandler())
                )

                // TODO : OAuth2

                .build();
    }

}
