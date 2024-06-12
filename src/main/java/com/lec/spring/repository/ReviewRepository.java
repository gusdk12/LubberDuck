package com.lec.spring.repository;

import com.lec.spring.domain.Review;

import java.util.List;

public interface ReviewRepository {

    int save(Review review);

    // 특정 id 글 내용 읽끼 (SELECT) => Post
    // 만약 해당 id 의 글 없으면 null 리턴
    Review findById(Long id);

    // 전체 글 목록. 최신순 (SELECT) => List<>
    List<Review> findAll();

    // 특정 id 글 수정 (제목, 내용) (UPDATE)
    int update(Review review);

    // 특정 id 글 삭제하기 (DELETE) <= Post(id)
    int delete(Review review);

}
