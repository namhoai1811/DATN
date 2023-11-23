package com.datn.api.repository;

import com.datn.api.model.Posts;
import com.datn.api.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface PostsRepository extends MongoRepository<Posts, String> {
    List<Posts> findByUserId(String userId);

    List<Posts> findPostsByUserIdIsEmpty();
    List<Posts> findPostsByUserIdNull();
    List<Posts> findPostsByUserIdNotNull();
}
