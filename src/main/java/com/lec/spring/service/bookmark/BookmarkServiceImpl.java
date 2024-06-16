package com.lec.spring.service.bookmark;

import com.lec.spring.domain.mypage.Bookmark;
import com.lec.spring.domain.mypage.QryBookmarkList;
import com.lec.spring.repository.mypage.BookmarkRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Queue;

@Service
public class BookmarkServiceImpl implements BookmarkService {

    private BookmarkRepository bookmarkRepository;

    @Autowired
    public BookmarkServiceImpl(SqlSession sqlSession){
        bookmarkRepository = sqlSession.getMapper(BookmarkRepository.class);
    }
    @Override
    public QryBookmarkList list(Long userId) {
        QryBookmarkList list = new QryBookmarkList();

        List<Bookmark> books = bookmarkRepository.findByUser(userId);

        list.setList(books);
        return list;
    }
}
