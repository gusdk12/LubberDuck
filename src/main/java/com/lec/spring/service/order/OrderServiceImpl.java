package com.lec.spring.service.order;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.order.Order;
import com.lec.spring.domain.order.OrderItem;
import com.lec.spring.domain.order.QryOrder;
import com.lec.spring.repository.order.OrderRepository;
import com.lec.spring.repository.order.OrderItemRepository;
import com.lec.spring.util.U;
import jakarta.servlet.http.HttpSession;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {


    @Value("${app.pagination.write_pages}")
    private int WRITE_PAGES;

    @Value("${app.pagination.page_rows}")
    private int PAGE_ROWS;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    public OrderServiceImpl(SqlSession sqlSession){
        orderRepository = sqlSession.getMapper(OrderRepository.class);
        orderItemRepository = sqlSession.getMapper(OrderItemRepository.class);
    }

    @Override
    public List<Order> findByUser(Long user_id) {
        return orderRepository.findByUser(user_id);
    }

    @Override
    public QryOrder addOrder(Long user_id) {
        Long new_id = (long)(orderRepository.countAll() + 1);

        Order order = Order.builder()
                .id(new_id)
                .user_id(user_id)
                .build();

        int cnt = orderRepository.insert(order);

        QryOrder result = new QryOrder();

        result.setCount(cnt);
        result.setOrder_id(new_id);
        result.setStatus("OK");

        return result;
    }

    @Override
    public QryResult addOrderItem(Long order_id, Long menu_id, Integer quantity, Integer price) {
        OrderItem item = OrderItem.builder()
                .order_id(order_id)
                .cocktail_id(menu_id)
                .quantity(quantity)
                .price(price)
                .build();

        int cnt = orderItemRepository.insert(item);

        QryResult result = QryResult.builder()
                .count(cnt)
                .status("OK")
                .build();

        return result;
    }

    @Override
    public List<Order> orderList(Long user_id, Integer page, Model model) {
        if (page == null || page < 1) page = 1; // default page

        HttpSession session = U.getSession();
        Integer writePages = (Integer) session.getAttribute("writePages");
        if (writePages == null) writePages = WRITE_PAGES;
        Integer pageRows = (Integer) session.getAttribute("pageRows");
        if (pageRows == null) pageRows = PAGE_ROWS;
        session.setAttribute("page", page);

        long cnt = orderRepository.cntAll(user_id);
        int totalPage = (int) Math.ceil(cnt / (double) pageRows); // 총 '페이지' 분량

        int startPage = 0;
        int endPage = 0;

        List<Order> list = null;

        if (cnt > 0) {
            if (page > totalPage) page = totalPage;

            int fromRow = (page - 1) * pageRows;

            startPage = (((page - 1) / writePages) * writePages) + 1;
            endPage = startPage + writePages - 1;
            if (endPage >= totalPage) endPage = totalPage;

            list = orderRepository.selectFromOrder(user_id, fromRow, pageRows);
            model.addAttribute("list", list);
        }else {
                page = 0;
            }


            model.addAttribute("cnt", cnt);  // 전체 글 개수
            model.addAttribute("page", page); // 현재 페이지
            model.addAttribute("totalPage", totalPage);  // 총 '페이지' 수
            model.addAttribute("pageRows", pageRows);  // 한 '페이지' 에 표시할 글 개수

            // [페이징]
            model.addAttribute("url", U.getRequest().getRequestURI());  // 목록 url
            model.addAttribute("writePages", writePages); // [페이징] 에 표시할 숫자 개수
            model.addAttribute("startPage", startPage);  // [페이징] 에 표시할 시작 페이지
            model.addAttribute("endPage", endPage);   // [페이징] 에 표시할 마지막 페이지

        return list;
        }
    }