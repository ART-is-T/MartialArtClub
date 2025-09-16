package com.martialclub.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

@Document(collection = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {
    @Id
    private String id;          // идентификатор MongoDB (строка)

    private String username;    // Имя пользователя (например "Иван")
    private String text;        // Текст отзыва
}