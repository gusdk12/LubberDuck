package com.lec.spring.service.chat;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lec.spring.domain.menu.Menu;
import com.lec.spring.service.menu.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService {

    @Value("${cohere.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private MenuService menuService;

    public String getResponse(String prompt) {

        List<Menu> menuList = menuService.sequenceList();
        ArrayList<String> menus = new ArrayList<>();
        for(Menu menu : menuList){
            menus.add(menu.getName());
        }

        prompt = "지금 당신은 가벼운 말투를 쓰는 바텐더이며, 손님의 기분에 따라 적절한 칵테일을 하나만 추천해야 합니다." +
                "칵테일은 메뉴에 있는 것 중 하나만 추천해야만 합니다. 현재 메뉴에 있는 칵테일의 종류는 모두, " + String.join(", ", menus) + "입니다. 반드시 이 중에 하나를 랜덤으로 추천하세요." +
                "칵테일을 한 잔 추천한 후, 손님의 기분이 좋아지길 빌어주세요. 상대는 손님이기 때문에 레시피를 소개할 필요는 없습니다." +
                "현재 손님의 기분은 " + prompt + "입니다.";
        String url = "https://api.cohere.ai/v1/generate";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        String requestBody = String.format("{\"prompt\": \"%s\", \"model\": \"command-r-plus\", \"max_tokens\": 120}", prompt);
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        try {
            JsonNode root = objectMapper.readTree(response.getBody());
            String text = root.path("generations").path(0).path("text").asText();
            return ensureCompleteResponse(text);
//            return text;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error processing response";
        }
    }


    private String ensureCompleteResponse(String response) {
        if (!response.endsWith(".") && !response.endsWith("!")) {
            ArrayList<String> responseSplit = new ArrayList<>();
            String[] responses = response.split("\\.");
            for(int i = 0; i < responses.length - 1; i++){
                responseSplit.add(responses[i] + ".");
            }
            return String.join(" ", responseSplit);
        }
        return response;
    }
}