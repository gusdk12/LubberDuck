package com.lec.spring.controller.chat;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.chat.ChatManager;
import com.lec.spring.domain.chat.QryChatList;
import com.lec.spring.domain.menu.Menu;
import com.lec.spring.service.chat.ChatServiceImpl;
import com.lec.spring.service.menu.MenuService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatServiceImpl chatServiceImpl;
    private final MenuService menuService;


    public ChatController(ChatServiceImpl chatServiceImpl, MenuService menuService) {
        this.chatServiceImpl = chatServiceImpl;
        this.menuService = menuService;
    }

    @GetMapping("/list/{userId}")
    public QryChatList list(@PathVariable Long userId){
        return chatServiceImpl.findByUser(userId, menuService.sequenceList());
    }

    @PostMapping("/add")
    public QryResult add(
            @RequestParam("user_Id") Long user_Id,
            @RequestParam("role") String role,
            @RequestParam("content") String content){
        ChatManager.getInstance().addUserHistory(user_Id, role, content);
        return chatServiceImpl.add(user_Id, role, content);
    }

    @PostMapping("/request")
    public QryResult request(
            @RequestParam("user_Id") Long user_Id,
            @RequestParam("role") String role){
        createInitPrompt();
        String fullPrompt = ChatManager.getInstance().getUserHistory(user_Id);
        System.out.println(fullPrompt);
        String response = chatServiceImpl.getResponse(fullPrompt).replace("\n", "\\n").replace("\"", "\\\"");
        response = response.replace("바텐더: ", "");
        return chatServiceImpl.add(user_Id, role, response);
    }

    @PostMapping("/clear/{user_Id}")
    public QryResult clear(@PathVariable Long user_Id){
        return chatServiceImpl.clear(user_Id);
    }

    private void createInitPrompt(){
        List<Menu> menuList = menuService.sequenceList();
        ArrayList<String> menus = new ArrayList<>();
        for(Menu menu : menuList){
            menus.add(menu.getName());
        }

        String menuProm = "";
        if(!menuList.isEmpty()) menuProm = "칵테일은 메뉴에 있는 것 중 하나만 추천해야만 합니다. 손님의 대답에 따라 적절한 칵테일을 하나 추천할 수 있습니다. 반드시 추천할 필요는 없습니다." +
                "현재 메뉴판에 있는 메뉴는 " + menuList.size() + "개 입니다. 현재 메뉴에 있는 칵테일의 종류는 모두, " + String.join(", ", menus) + "입니다." +
                "이 중에 하나를 반드시 랜덤으로 추천하세요. ";
        else menuProm = "현재 아쉽게도 메뉴판에는 메뉴가 하나도 없습니다. 손님에게 메뉴가 비어있다고 양해를 구하세요.";

        String initProm =  "당신은 'Rubber Bar'의 바텐더이자 훌륭한 상담가입니다. " +
                menuProm + "칵테일 이름을 한국어로 번역하지 마세요!!" +
                "손님의 기분을 좋아지게 해주기 위한 대화를 하세요. 손님 대신 대답하지 마세요!!! 손님을 사칭하지 마세요!!! 손님과 적절한 대화를 이어나가세요. 손님이 칵테일 추천을 더이상 바라지 않는다면, 추천하지 마세요. 말을 반복하지 마세요!! 이미 손님에게 또 인사하지 마세요!!";
        String exampleProm = "바텐더 답장 예시입니다. : '오, 그건 'Old Fashioned'입니다. 올드 패션드는 가장 고전적인 칵테일 중 하나로, 위스키의 풍미와 비터의 조화가 훌륭한 균형을 이룹니다. 간단한 재료로 만들어지지만, 세심한 기술과 정성이 필요한 칵테일이기도 하죠.'" +
                ", '저는 바텐더이지만, 상담가이기도 합니다. 오늘은 어떤 기분이 드시나요?'" +
                ", '물론이죠, 여기서는 훌륭한 칵테일뿐만 아니라 마음의 평화도 찾으실 수 있습니다. 불안과 두려움을 잠시 잊고 편안한 밤을 보내는 데에 도움을 드리고 싶군요.'" +
                ", '손님이 기쁘시다면 저도 기쁩니다!'";

        ChatManager.getInstance().addInitSetting(initProm + exampleProm);
    }

}