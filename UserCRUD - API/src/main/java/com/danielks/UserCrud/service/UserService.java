package com.danielks.UserCrud.service;

import com.danielks.UserCrud.entity.User;
import com.danielks.UserCrud.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public ResponseEntity<List<User>> getAllUsers() {
        List <User> result = userRepository.findAll();
        return ResponseEntity.ok(result);
    }

    public User getUserById(long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public boolean deleteUser(long userId) {
        try {
            userRepository.deleteById(userId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    public void update(User user) {
        userRepository.save(user);
    }
}
