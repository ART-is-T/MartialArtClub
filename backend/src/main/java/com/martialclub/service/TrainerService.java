package com.martialclub.service;

import com.martialclub.model.Trainer;
import com.martialclub.repository.TrainerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TrainerService {
    private final TrainerRepository repository;

    public TrainerService(TrainerRepository repository) {
        this.repository = repository;
    }

    public List<Trainer> getAll() {
        return repository.findAll();
    }

    public Trainer getBySlug(String slug) {
        return repository.findBySlug(slug)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Trainer not found"));
    }

    public Trainer save(Trainer trainer) {
        return repository.save(trainer);
    }

    public Trainer update(Long id, Trainer updated) {
        Trainer existing = repository.findById(id).orElseThrow();
        existing.setName(updated.getName());
        existing.setSlug(updated.getSlug());
        existing.setMartialArt(updated.getMartialArt());
        existing.setBio(updated.getBio());
        existing.setPhotoUrl(updated.getPhotoUrl());
        existing.setBackgroundImage(updated.getBackgroundImage());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}