package com.lec.spring.service.guestBook;

import com.lec.spring.domain.QryResult;
import com.lec.spring.domain.guestBook.GuestBook;
import com.lec.spring.domain.guestBook.QryGuestBookLIst;
import com.lec.spring.repository.guestBook.GuestBookRepository;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuestBookServiceImpl implements GuestBookService {
    private GuestBookRepository guestBookRepository;

    @Autowired
    public GuestBookServiceImpl(SqlSession sqlSession) {
        guestBookRepository = sqlSession.getMapper(GuestBookRepository.class);
    }


    @Override
    public QryResult write(Long user_id, Double x_coordinate, Double y_coordinate, String content, Integer postItKind) {
        Long newZ = guestBookRepository.findMaxZ();
        if (newZ == null) {
            newZ = 1L;
        } else {
            newZ++;
        }
        GuestBook guestBook = GuestBook.builder()
                .user_id(user_id)
                .x_coordinate(x_coordinate)
                .y_coordinate(y_coordinate)
                .z_coordinate(newZ)
                .content(content)
                .postItKind(postItKind)
                .build();

        int cnt = guestBookRepository.insertByGuestBook(guestBook);


        QryResult result = QryResult.builder()
                .count(cnt)
                .status("OK")
                .build();

        return result;
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
    public QryResult updateByPostIt(Long id, Long user_id, Double x_coordinate, Double y_coordinate) {
        Long newZ = guestBookRepository.findMaxZ() + 1;

        GuestBook guestBook = GuestBook.builder()
                .id(id)
                .user_id(user_id)
                .x_coordinate(x_coordinate)
                .y_coordinate(y_coordinate)
                .z_coordinate(newZ)
                .build();

        int cnt = guestBookRepository.updateById(guestBook);

        QryResult result = QryResult.builder()
                .count(cnt)
                .status("OK")
                .build();
        return result;
    }


    @Override
    public QryResult deleteById(Long id) {
        return null;
    }
}
