package com.lec.spring.service.guestBook;

import com.lec.spring.domain.guestBook.GuestBook;
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

    // 방명록 작성하기
    @Override
    public int write(GuestBook guestBook) {
        return guestBookRepository.insertByGuestBook(guestBook);
    }

    // 모든 방명록 조회
    @Override
    public List<GuestBook> postItAll() {
        return guestBookRepository.contentAll();
    }

    // 해당 id 방명록 조회
    @Override
    @Transactional
    public GuestBook selectByPostIt(Long id) {
        return guestBookRepository.findById(id);
    }

    @Override
    public int updateByPostIt(GuestBook guestBook) {



        return guestBookRepository.updateById(guestBook);
    }

    @Override
    public int deleteById(Long id) {
        int result = 0;

        GuestBook guestBook = guestBookRepository.findById(id);    // 존재하는 데이터인지 확인 -> UPDATE 에도 만들어야 하긴 함

        if (guestBook != null) { // 존재한다면 삭제 진행
            result = guestBookRepository.deleteByPostIt(guestBook);
        }
        return result;
    }
}
