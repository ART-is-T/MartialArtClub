package com.martialclub.service;

import com.martialclub.model.Review;
import com.martialclub.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {
    private final ReviewRepository repository;

    public ReviewService(ReviewRepository repository) {
        this.repository = repository;
    }

    public List<Review> getAllReviews() {
        return repository.findAll();
    }

    public Review createReview(Review review) {
        return repository.save(review);
    }

    public void deleteReview(String id) {
        repository.deleteById(id);
    }
}