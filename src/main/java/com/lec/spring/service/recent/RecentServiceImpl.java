package com.lec.spring.service.recent;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.User;
import com.lec.spring.domain.menu.Menu;
import com.lec.spring.domain.recent.QryRecent;
import com.lec.spring.domain.recent.QryRecentList;
import com.lec.spring.domain.recent.Recent;
import com.lec.spring.repository.UserRepository;
import com.lec.spring.repository.menu.MenuRepository;
import com.lec.spring.repository.recent.RecentRepository;
import com.lec.spring.util.U;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecentServiceImpl implements RecentService {

    private UserRepository userRepository;
    private MenuRepository menuRepository;
    private RecentRepository recentRepository;

    @Autowired
    public RecentServiceImpl(SqlSession sqlSession){
        userRepository = sqlSession.getMapper(UserRepository.class);
        menuRepository = sqlSession.getMapper(MenuRepository.class);
        recentRepository = sqlSession.getMapper(RecentRepository.class);
    }

    @Override
    public QryRecentList findByUser(Long userId) {
        QryRecentList list = new QryRecentList();

        List<Recent> recents = recentRepository.findByUser(userId);

        list.setCount(recents.size());
        list.setList(recents);
        list.setStatus("OK");

        return list;
    }

    public QryResult findByUserAndMenu(Long user_id, Long menu_id) {
        QryRecent qryRecent = new QryRecent();

        Recent recents = recentRepository.findByUserAndMenu(user_id, menu_id);

        qryRecent.setCount(1);
        qryRecent.setRecent(recents);
        qryRecent.setStatus("OK");

        return qryRecent;
    }

    @Override
    public QryResult add(Long user_id, Long menu_id) {
        User user = userRepository.findById(user_id);
        Menu menu = menuRepository.findById(menu_id);

        Recent recent = Recent.builder()
                .user_id(user.getId())
                .menu_id(menu.getId())
                .menu(menu)
                .build();

        int cnt = recentRepository.insert(recent);

        QryResult result = QryResult.builder()
                .count(cnt)
                .status("OK")
                .build();

        return result;
    }

    @Override
    public QryResult delete(Long userId, Long menuId) {
        int cnt = recentRepository.delete(userId, menuId);

        QryResult result = QryResult.builder()
                .count(cnt)
                .status("OK")
                .build();

        return result;
    }



}
