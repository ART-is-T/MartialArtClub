package com.martialclub.config;

import com.martialclub.model.Role;
import com.martialclub.model.User;
import com.martialclub.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    public DataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.encoder = new BCryptPasswordEncoder(); // можно вынести в отдельный @Bean
    }

    @Override
    public void run(String... args) {
        // Проверяем: существует ли пользователь admin
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = User.builder()
                    .username("admin")
                    .password(encoder.encode("123"))  // пароль 123 в bcrypt
                    .fullName("Администратор")
                    .email("admin@local")
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
            System.out.println("✅ Админ создан: логин=admin, пароль=123");
        }
    }
}