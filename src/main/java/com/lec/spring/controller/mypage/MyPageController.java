package com.lec.spring.controller.mypage;

import com.lec.spring.domain.User;
import com.lec.spring.domain.order.Order;
import com.lec.spring.domain.order.Order_item;
import com.lec.spring.service.UserService;
import com.lec.spring.service.order.OrderService;
import com.lec.spring.service.order.Order_itemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/mypage")
public class MyPageController {

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private Order_itemService orderItemService;

    @GetMapping("/info")
    public String info(Model model,
                       @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            // UserDetails가 null일 경우에 대한 처리
            // 로그인 페이지로 리디렉션할 수 있습니다.
            return "redirect:/user/login";
        }

        String username = userDetails.getUsername();
        User user = userService.findByUsername(username);
        if (user == null) {
            // 사용자가 null일 경우에 대한 처리
            // 적절한 예외 처리를 할 수 있습니다.
            return "redirect:/error";
        }

        model.addAttribute("user", user);
        return "mypage/info";
    }

    @GetMapping("/myPageUpdate")
    public void myPageUpdate(Model model,
                             @AuthenticationPrincipal UserDetails userDetails) {

    }

    @GetMapping("/order")
    public String order(Model model, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return "redirect:/user/login";
        }

        String username = userDetails.getUsername();
        User user = userService.findByUsername(username);

        if (user == null) {
            return "redirect:/error";
        }

        Long userId = user.getId();
        List<Order> orders = orderService.findByUser(userId);

        // 주문 항목들을 저장할 맵을 준비합니다.
        Map<Long, List<Order_item>> orderItemsMap = new HashMap<>();

        // 각 주문에 대해 주문 항목을 조회하고 맵에 저장합니다.
        for (Order order : orders) {
            List<Order_item> orderItems = orderItemService.findByOrder(order.getId());
            orderItemsMap.put(order.getId(), orderItems);
        }

        // 모델에 주문 목록과 주문 항목 맵을 추가합니다.
        model.addAttribute("orders", orders);
        model.addAttribute("user", user);
        model.addAttribute("orderItemsMap", orderItemsMap);

        // mypage/order 뷰를 반환합니다.
        return "mypage/order";
    }




    @RequestMapping("/info")
    public void info(){}

    @RequestMapping("/review")
    public void review(){}

    @GetMapping("/bookmark")
    public void bookmark(){}
}
