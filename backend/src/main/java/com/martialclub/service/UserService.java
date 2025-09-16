package com.martialclub.service;

import com.martialclub.model.User;
import com.martialclub.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Пользователь с таким именем уже существует");
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    public User updateUser(Long id, User updated) {
        User user = userRepository.findById(id).orElseThrow();
        user.setFullName(updated.getFullName());
        user.setEmail(updated.getEmail());
        user.setSkillLevel(updated.getSkillLevel());
        user.setMartialArt(updated.getMartialArt());
        user.setCertificates(updated.getCertificates());
        user.setExperience(updated.getExperience());
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}