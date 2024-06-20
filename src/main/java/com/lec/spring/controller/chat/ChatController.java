package com.lec.spring.controller.chat;

import com.lec.spring.domain.chat.Chat;
import com.lec.spring.domain.menu.Menu;
import com.lec.spring.service.chat.ChatService;
import com.lec.spring.service.menu.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ChatController {

    private final ChatService chatService;

//    @Autowired
    private final MenuService menuService;

    private final Chat conversation = new Chat();

    public ChatController(ChatService chatService, MenuService menuService) {
        this.chatService = chatService;
        this.menuService = menuService;

        createInitPrompt();
    }

//    @GetMapping("/chat")
//    public String chat(@RequestParam String prompt) {
//        return chatService.getResponse(prompt);
//    }

    @GetMapping("/chat")
    public String chat(@RequestParam String prompt) {
        conversation.addMessage("손님", prompt);
        String fullPrompt = createFullPrompt(conversation.getHistory());
        System.out.println("새로운채팅" + fullPrompt);

        String response = chatService.getResponse(fullPrompt).replace("\n", "\\n").replace("\"", "\\\"");

        conversation.addMessage("바텐더", response);
        return response;
    }

    @GetMapping("/clear")
    public String clearChat() {
        conversation.clearHistory();
        return "Conversation history cleared.";
    }

    private void createInitPrompt(){
        List<Menu> menuList = menuService.sequenceList();
        ArrayList<String> menus = new ArrayList<>();
        for(Menu menu : menuList){
            menus.add(menu.getName());
        }

        String initProm =  "지금 당신은 'Rubber Bar'의 바텐더이자 훌륭한 상담가입니다., 손님의 대답에 따라 적절한 칵테일을 하나 추천할 수 있습니다. 반드시 추천할 필요는 없습니다." +
                "칵테일은 메뉴에 있는 것 중 하나만 추천해야만 합니다. 현재 메뉴에 있는 칵테일의 종류는 모두, " + String.join(", ", menus) + "입니다. 이 중에 하나를 반드시 랜덤으로 추천하세요." +
                "손님의 기분을 좋아지게 해주기 위한 대화를 하세요. 손님의 역할을 맡지 마세요!! 손님과 적절한 대화를 이어나가세요. 손님이 칵테일 추천을 더이상 바라지 않는다면, 추천하지 마세요.";
        conversation.addInitSetting(initProm);
        conversation.addMessage("바텐더", "안녕하세요! 오늘은 기분이 어떠신가요, 손님?");
    }

    private String createFullPrompt(String history) {
        return history + "바텐더:";
    }

}