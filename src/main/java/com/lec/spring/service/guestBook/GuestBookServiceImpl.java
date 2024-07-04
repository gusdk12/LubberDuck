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

    private final int maxZIndex = 100000000;

    @Autowired
    public GuestBookServiceImpl(SqlSession sqlSession) {
        guestBookRepository = sqlSession.getMapper(GuestBookRepository.class);
    }


    @Override
    public QryResult write(Long user_id, Double x_coordinate, Double y_coordinate, Long z_coordinate, String content, Integer postItKind) {

        GuestBook guestBook = GuestBook.builder()
                .user_id(user_id)
                .x_coordinate(x_coordinate)
                .y_coordinate(y_coordinate)
                .z_coordinate(z_coordinate)
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
    public Long maxZ_index() {
        Long newZ = guestBookRepository.findMaxZ();
        if (newZ == null)
            newZ = 0L;
        else if (newZ >= maxZIndex) {
            organizeZIndex();
            return maxZ_index();
        }
        return newZ;
    }

    @Override
    public void organizeZIndex() {
        List<GuestBook> guestBookList = guestBookRepository.contentAll();
        for (int i = 0; i < guestBookList.size(); i++){
            GuestBook guestBook = GuestBook.builder()
                    .id(guestBookList.get(i).getId())
                    .user_id(guestBookList.get(i).getUser_id())
                    .x_coordinate(guestBookList.get(i).getX_coordinate())
                    .y_coordinate(guestBookList.get(i).getY_coordinate())
                    .z_coordinate((long)(i + 1))
                    .build();
            guestBookRepository.updateById(guestBook);
        }
    }

    @Override
    public QryResult updateByPostIt(Long id, Long user_id, Double x_coordinate, Double y_coordinate, Long z_coordinate) {

        GuestBook guestBook = GuestBook.builder()
                .id(id)
                .user_id(user_id)
                .x_coordinate(x_coordinate)
                .y_coordinate(y_coordinate)
                .z_coordinate(z_coordinate)
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
        int cnt = guestBookRepository.deleteByPostIt(id);

        QryResult result = QryResult.builder()
                .count(cnt)
                .status("OK")
                .build();
        return result;
    }
}
