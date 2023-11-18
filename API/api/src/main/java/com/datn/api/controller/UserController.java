package com.datn.api.controller;


import com.datn.api.dto.UserDto;
import com.datn.api.facade.UserFacade;

import com.datn.api.model.User;

import com.datn.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserFacade userFacade;
    private final UserRepository userRepository;
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("auth/login")
    public ResponseEntity login(@RequestBody UserDto.RequestDto requestDto) {

        User user = userFacade.userQueryByUserName(requestDto.getEmail());
        if(user==null )
            return ResponseEntity.ok("user or password fail");
        if(user.getEmail().equals(requestDto.getEmail())&&user.getPassWord().equals(requestDto.getPassWord()))
            return ResponseEntity.ok(user);
        return ResponseEntity.ok("user or password fail");
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserDto.RequestDto requestDto) {

        User user = new User();
        user.setEmail(requestDto.getEmail());
        user.setPassWord(requestDto.getPassWord());
        user.setRole(requestDto.getRole());

        return ResponseEntity.status(201).body(this.userRepository.save(user));
    }
    @GetMapping("/user/findAll")
    public ResponseEntity<List<User>> getAllUsers() {

        return ResponseEntity.ok(this.userRepository.findAll());
    }

    @PostMapping("/user/create")
    public ResponseEntity<User> createUser(@RequestBody UserDto.RequestDto requestDto) {

        User user = new User();
        user.setEmail(requestDto.getEmail());
        user.setPassWord(requestDto.getPassWord());
        user.setRole(requestDto.getRole());

        return ResponseEntity.status(201).body(this.userRepository.save(user));
    }

    @PostMapping("/user/update")
    public ResponseEntity updateUser(@RequestBody UserDto.RequestDto requestDto) {

        Optional<User> user = this.userRepository.findById(requestDto.getId());
        if(user.isPresent()) {
            System.out.println("userTest" + requestDto.getEmail() +requestDto.getPassWord());
            user.get().setEmail(requestDto.getEmail());
            user.get().setPassWord(requestDto.getPassWord());
            System.out.println("userTest1 - " + user.get().getEmail() +user.get().getPassWord());
            this.userRepository.save(user.get());
            Optional<User> entity = this.userRepository.findById(requestDto.getId());

            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.ok("The product with id: " + requestDto.getId() + " was not found.");
        }

    }

    @GetMapping("/user/find/{userId}")
    public ResponseEntity getUserById(@PathVariable String userId) {

        Optional<User> user = this.userRepository.findById(userId);

        if(user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.ok("The product with id: " + userId + " was not found.");
        }
    }
    @GetMapping("/user/delete/{userId}")
    public ResponseEntity getUserById1(@PathVariable String userId) {

        Optional<User> user = this.userRepository.findById(userId);

        if(user.isPresent()) {
            this.userRepository.deleteById(userId);
            return ResponseEntity.ok("Success.");
        } else {
            return ResponseEntity.ok("The user with id: " + userId + " was not delete.");
        }
    }

}
