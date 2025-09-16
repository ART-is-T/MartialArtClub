package com.martialclub.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String fullName;
    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;

    // Дополнительные поля: уровень, сертификаты и т.д.
    private String skillLevel; // для студентов
    private String martialArt; // предпочтение или специализация
    private String certificates; // для тренеров
    private String experience; // для тренеров
}