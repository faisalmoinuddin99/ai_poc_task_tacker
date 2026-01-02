package com.faisal.tasktracker.service;

import com.faisal.tasktracker.model.User;
import com.faisal.tasktracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserResolverService {

    private final UserRepository userRepository;

    public UserResolverService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> resolveUsers(List<String> tokens) {

        Set<User> result = new HashSet<>();

        for (String token : tokens) {
            result.addAll(userRepository.findByNameIgnoreCaseContaining(token));
        }

        return new ArrayList<>(result);
    }
}
