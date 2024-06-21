package com.lec.spring.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomOAuth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {


        String prevPage = (String) request.getSession().getAttribute("prevPage");
        // 이전 페이지가 존재하는 경우에만 그 페이지로 리다이렉트

        if (prevPage != null && !prevPage.isEmpty()) {
            // 이전 페이지로 리다이렉트
            getRedirectStrategy().sendRedirect(request, response, prevPage);
        } else {
            // 기본 URL로 리다이렉트
            super.onAuthenticationSuccess(request, response, authentication);
        }
    }
}