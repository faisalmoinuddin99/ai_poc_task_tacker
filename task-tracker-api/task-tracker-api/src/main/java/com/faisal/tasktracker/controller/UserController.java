package com.faisal.tasktracker.controller;

import com.faisal.tasktracker.model.User;
import com.faisal.tasktracker.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/by-email")
    public User getByEmail(@RequestParam String email) {
        return userService.getByEmail(email);
    }
}
