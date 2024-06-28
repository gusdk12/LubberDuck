package com.lec.spring.service.guestBook;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.guestBook.GuestBook;
import com.lec.spring.domain.guestBook.QryGuestBook;
import com.lec.spring.domain.guestBook.QryGuestBookLIst;
import com.lec.spring.repository.guestBook.GuestBookRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class GuestBookServiceImpl implements GuestBookService {
    private GuestBookRepository guestBookRepository;

    @Autowired
    public GuestBookServiceImpl(SqlSession sqlSession) {
        guestBookRepository = sqlSession.getMapper(GuestBookRepository.class);
    }

    @Override
    public QryResult write(GuestBook guestBook) {
        return null;
    }

    @Override
    public QryGuestBookLIst postItAll() {
        QryGuestBookLIst guestBookLIst = new QryGuestBookLIst();
        List<GuestBook> guestBook = guestBookRepository.contentAll();
        guestBookLIst.setCount(guestBook.size());
        guestBookLIst.setGuestBookList(guestBook);
        guestBookLIst.setStatus("OK");
        return guestBookLIst;
    }

    @Override
    public QryResult selectByPostIt(Long id) {
        return null;
    }

    @Override
    public QryResult updateByPostIt(GuestBook guestBook) {
        return null;
    }

    @Override
    public QryResult deleteById(Long id) {
        return null;
    }
}
