package com.datn.api.repository;

import com.datn.api.model.Posts;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface PostsRepository extends MongoRepository<Posts, String> {
}
