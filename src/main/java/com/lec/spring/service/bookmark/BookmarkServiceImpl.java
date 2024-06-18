package com.lec.spring.service.bookmark;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.User;
import com.lec.spring.domain.menu.Menu;
import com.lec.spring.domain.mypage.Bookmark;
import com.lec.spring.domain.mypage.QryBookmark;
import com.lec.spring.domain.mypage.QryBookmarkList;
import com.lec.spring.repository.UserRepository;
import com.lec.spring.repository.menu.MenuRepository;
import com.lec.spring.repository.mypage.BookmarkRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.List;
import java.util.Queue;

@Service
public class BookmarkServiceImpl implements BookmarkService {
    private UserRepository userRepository;
    private MenuRepository menuRepository;
    private BookmarkRepository bookmarkRepository;

    @Autowired
    public BookmarkServiceImpl(SqlSession sqlSession){
        userRepository = sqlSession.getMapper(UserRepository.class);
        menuRepository = sqlSession.getMapper(MenuRepository.class);
        bookmarkRepository = sqlSession.getMapper(BookmarkRepository.class);
    }

    @Override
    public QryBookmarkList findByUser(Long userId) {
        QryBookmarkList list = new QryBookmarkList();

        List<Bookmark> books = bookmarkRepository.findByUser(userId);

        list.setCount(books.size());
        list.setList(books);
        list.setStatus("OK");

        return list;
    }

    @Override
    public QryResult findByUserAndMenu(Long userId, Long menuId) {
        QryBookmark qryBookmark = new QryBookmark();

        Bookmark bookmark = bookmarkRepository.findByUserAndMenu(userId, menuId);

        qryBookmark.setCount(1);
        qryBookmark.setBookmark(bookmark);
        qryBookmark.setStatus("OK");

        return qryBookmark;
    }

    @Override
    public QryResult add(Long userId, Long menuId, String comment) {
        User user = userRepository.findById(userId);
        Menu menu = menuRepository.findById(menuId);

        Bookmark bookmark=Bookmark.builder()
                .user_id(user.getId())
                .menu_id(menu.getId())
                .menu(menu)
                .comment(comment)
                .build();

        int cnt = bookmarkRepository.insert(bookmark);

        QryResult result = QryResult.builder()
                .count(cnt)
                .status("OK")
                .build();

        return result;
    }

    @Override
    public QryResult delete(Long userId, Long menuId) {
        int cnt = bookmarkRepository.delete(userId, menuId);

        QryResult result = QryResult.builder()
                .count(cnt)
                .status("OK")
                .build();

        return result;
    }
}
