package com.lec.spring.service.cart;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.User;
import com.lec.spring.domain.cart.Cart;
import com.lec.spring.domain.cart.QryCart;
import com.lec.spring.domain.cart.QryCartList;
import com.lec.spring.domain.menu.Menu;
import com.lec.spring.repository.UserRepository;
import com.lec.spring.repository.cart.CartRepository;
import com.lec.spring.repository.menu.MenuRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    private CartRepository cartRepository;
    private UserRepository userRepository;
    private MenuRepository menuRepository;

    @Autowired
    public CartServiceImpl(SqlSession sqlSession){
        menuRepository = sqlSession.getMapper(MenuRepository.class);
        userRepository = sqlSession.getMapper(UserRepository.class);
        cartRepository = sqlSession.getMapper(CartRepository.class);
    }

    @Override
    public QryCartList findByUser(Long user_id) {

        QryCartList list = new QryCartList();

        List<Cart> carts = cartRepository.findByUser(user_id);

        list.setCount(carts.size());
        list.setList(carts);
        list.setStatus("OK");

        return list;

    }

    @Override
    public QryResult findByUserAndMenu(Long user_id, Long cocktail_Id){
        QryCart qryCart = new QryCart();

        Cart cart = cartRepository.findByUserAndMenu(user_id, cocktail_Id);

        qryCart.setCount(1);
        qryCart.setCart(cart);
        qryCart.setStatus("OK");

        return qryCart;
    }

    @Override
    public QryResult add(Long user_id, Long cocktail_Id, Integer quantity) {
        User user = userRepository.findById(user_id);
        Menu menu = menuRepository.findById(cocktail_Id);

        Cart cart = Cart.builder()
                .user_id(user.getId())
                .menu_id(menu.getId())
                .user(user)
                .menu(menu)
                .quantity(quantity)
                .build();

        int cnt = cartRepository.insert(cart);

        QryResult result = QryResult.builder()
                .count(cnt)
                .status("OK")
                .build();

        return result;
    }

    @Override
    public QryResult delete(Long user_id, Long menu_Id) {
        int cnt = cartRepository.delete(user_id, menu_Id);

        QryResult result = QryResult.builder()
                .count(cnt)
                .status("OK")
                .build();

        return result;
    }

    @Override
    public QryResult clear(Long user_id) {
        int cnt = cartRepository.clear(user_id);

        QryResult result = QryResult.builder()
                .count(cnt)
                .status("OK")
                .build();

        return result;
    }

    @Override
    public QryResult incQuantity(Long user_id, Long menu_Id) {

        cartRepository.incQuantity(user_id, menu_Id);

        QryResult result = findByUserAndMenu(user_id, menu_Id);

        return result;
    }
    @Override
    public QryResult decQuantity(Long user_id, Long menu_Id) {

        cartRepository.decQuantity(user_id, menu_Id);

        QryResult result = findByUserAndMenu(user_id, menu_Id);

        return result;
    }
}
