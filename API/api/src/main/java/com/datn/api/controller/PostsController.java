package com.datn.api.controller;

import com.datn.api.dto.PostsDto;
import com.datn.api.dto.UserDto;
import com.datn.api.facade.PostsFacade;
import com.datn.api.facade.UserFacade;
import com.datn.api.model.Posts;
import com.datn.api.model.User;
import com.datn.api.repository.PostsRepository;
import com.datn.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class PostsController {

    @Autowired
    private PostsFacade postsFacade;
    private final PostsRepository postsRepository;
    public PostsController(PostsRepository postsRepository) {
        this.postsRepository = postsRepository;
    }
    @GetMapping("/posts/findAll")
    public ResponseEntity<List<Posts>> getAllUsers() {

        return ResponseEntity.ok(this.postsRepository.findAll());
    }

    @PostMapping("/posts/create")
//    public ResponseEntity<Posts> createUser(@RequestBody PostsDto.RequestDto requestDto) {
    public ResponseEntity<Posts> createUser(@RequestBody Posts posts) {
//        User user = new User();
//        user.setUserName(requestDto.getUserName());
//        user.setPassWord(requestDto.getPassWord());
//        user.setRole(requestDto.getRole());

        return ResponseEntity.status(201).body(this.postsRepository.save(posts));
    }

    @PostMapping("/posts/update")
    public ResponseEntity updateUser(@RequestBody Posts posts) {

//        Optional<Posts> entity = this.postsRepository.findById(requestDto.getId());
//        if(entity.isPresent()) {

//            user.get().setUserName(requestDto.getUserName());
//            user.get().setPassWord(requestDto.getPassWord());
//            System.out.println("userTest1 - " + user.get().getUserName() +user.get().getPassWord());
            this.postsRepository.save(posts);
            Optional<Posts> entity = this.postsRepository.findById(posts.getId());
            if(entity.isPresent()) {
                return ResponseEntity.ok(entity.get());
            }
        return ResponseEntity.ok("The posts  was not update.");


    }

    @GetMapping("/posts/find/{postId}")
    public ResponseEntity getUserById(@PathVariable String postId) {

        Optional<Posts> posts = this.postsRepository.findById(postId);

        if(posts.isPresent()) {
            return ResponseEntity.ok(posts.get());
        } else {
            return ResponseEntity.ok("The posts with id: " + postId + " was not found.");
        }
    }
    @GetMapping("/posts/delete/{postId}")
    public ResponseEntity getUserById1(@PathVariable String postId) {

        Optional<Posts> posts = this.postsRepository.findById(postId);

        if(posts.isPresent()) {
            this.postsRepository.deleteById(postId);
            return ResponseEntity.ok("Success.");
        } else {
            return ResponseEntity.ok("The posts with id: " + postId + " was not delete.");
        }
    }
}
