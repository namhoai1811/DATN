package com.datn.api.repository;

import com.datn.api.model.ConfigCrawler;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ConfigCrawlerRepository extends MongoRepository<ConfigCrawler, String> {
}
