package com.lec.spring.service.chat;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.chat.Chat;
import com.lec.spring.domain.chat.ChatManager;
import com.lec.spring.domain.chat.QryChatList;
import com.lec.spring.domain.menu.Menu;
import com.lec.spring.repository.chat.ChatRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Service
public class ChatServiceImpl implements ChatService {

    @Value("${cohere.api.key}")
    private String apiKey;

    private ChatRepository chatRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    public ChatServiceImpl(SqlSession sqlSession){
        chatRepository = sqlSession.getMapper(ChatRepository.class);
    }

    public String getResponse(String prompt) {
        String url = "https://api.cohere.ai/v1/generate";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        double temperature = 1.0;
        double frequencyPenalty = 0.0;
        double presencePenalty = 0.2;
        int contextSize = 6000;
        int topK = 100;
        double topP = 0.95;
        int maxTokens = 100;


        String requestBody = String.format(
                "{\"prompt\": \"%s\", \"model\": \"command-r-plus\", \"max_tokens\": %d, " +
                        "\"temperature\": %f, \"frequency_penalty\": %f, \"presence_penalty\": %f, " +
                        "\"context_size\": %d, \"top_k\": %d, \"top_p\": %f}",
                prompt,
                maxTokens,
                temperature,
                frequencyPenalty,
                presencePenalty,
                contextSize,
                topK,
                topP
        );

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        try {
            JsonNode root = objectMapper.readTree(response.getBody());
            String text = root.path("generations").path(0).path("text").asText();
            return ensureCompleteResponse(text);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error processing response";
        }
    }
    private String ensureCompleteResponse(String response) {
        if (!response.endsWith(".") && !response.endsWith("!") && !response.endsWith("?")) {
            String[] responses = response.split("[.!?]");
            return response.substring(0, response.length() - responses[responses.length - 1].length());
        }
        return response;
    }

    @Override
    public QryChatList findByUser(Long user_id, List<Menu> menuList) {
        QryChatList list = new QryChatList();

        List<Chat> chats = chatRepository.findByUser(user_id);
        if(chats.isEmpty()){
            add(user_id, "바텐더", "안녕하세요, Rubber Bar에 오신걸 환영해요! 오늘은 기분이 어떠신가요, 손님?");
            Chat greetingschat = Chat.builder().user_id(user_id).role("바텐더")
                    .content("안녕하세요, Rubber Bar에 오신걸 환영해요! 오늘은 기분이 어떠신가요, 손님?")
                    .build();
            chats.add(greetingschat);
        }

        list.setCount(chats.size());
        list.setList(chats);
        list.setStatus("OK");
        list.setMenuList(menuList);

        ChatManager.getInstance().makeUserHistory(user_id, chats);

        return list;
    }

    @Override
    public QryResult add(Long user_Id, String role, String content) {
        Chat chat = Chat.builder()
                .user_id(user_Id)
                .role(role)
                .content(content)
                .build();

        int cnt = chatRepository.insert(chat);

        QryResult result = QryResult.builder()
                .count(cnt)
                .status("OK")
                .build();

        return result;
    }

    @Override
    public QryResult clear(Long user_Id) {
        int cnt = chatRepository.deleteByUser(user_Id);

        QryResult result = QryResult.builder()
                .count(cnt)
                .status("OK")
                .build();

        return result;
    }

}