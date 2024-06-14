package com.lec.spring.service.cart;

import com.lec.spring.domain.cart.Cart;
import com.lec.spring.domain.cart.QryCartList;
import com.lec.spring.repository.cart.CartRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    private CartRepository cartRepository;

    @Autowired
    public CartServiceImpl(SqlSession sqlSession){
        cartRepository = sqlSession.getMapper(CartRepository.class);
    }

    @Override
    public QryCartList list(Long user_id) {

        QryCartList list = new QryCartList();

        List<Cart> comments = cartRepository.findByUser(user_id);

        list.setCount(comments.size());
        list.setList(comments);
        list.setStatus("OK");

        return list;
    }
}
