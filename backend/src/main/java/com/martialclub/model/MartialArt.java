package com.martialclub.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MartialArt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(unique = true)
    private String slug; // 👈 стабильный путь для URL (/martial-art/karate)

    @Column(length = 3000)
    private String description;

    private String bgImage;
    private String iconImage;
}