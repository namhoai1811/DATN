package com.datn.api.repository;

import com.datn.api.model.Posts;
import com.datn.api.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
@Repository

public interface PostsRepository extends MongoRepository<Posts, String> {
    List<Posts> findByUserId(String userId);
    Page<Posts> findAllByOrderByDateDesc(Pageable pageable);

    List<Posts> findPostsByUserIdIsEmpty();
    List<Posts> findPostsByUserIdNull();
    List<Posts> findPostsByUserIdNotNull();
    List<Posts> findPostsByTitleLike(String title);
}
