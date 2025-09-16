package com.martialclub.controller;

import com.martialclub.model.Review;
import com.martialclub.service.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    private final ReviewService service;

    public ReviewController(ReviewService service) {
        this.service = service;
    }

    // 👉 Получить все отзывы
    @GetMapping
    public List<Review> getReviews() {
        return service.getAllReviews();
    }

    // 👉 Создать новый отзыв
    @PostMapping
    public Review addReview(@RequestBody Review review, Principal principal) {
        review.setUsername(principal.getName()); // берём имя из аутентификации
        return service.createReview(review);
    }

    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable String id) {
        service.deleteReview(id);
    }
}