package com.martialclub.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trainer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String slug; // 👈 уникальный URL, например "ivan-karpov"

    private String martialArt;
    @Column(length = 2000)
    private String bio;
    private String photoUrl;
    private String backgroundImage;
}