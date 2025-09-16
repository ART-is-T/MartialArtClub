package com.martialclub.controller;

import com.martialclub.model.Trainer;
import com.martialclub.service.TrainerService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainers")
public class TrainerController {
    private final TrainerService service;

    public TrainerController(TrainerService service) {
        this.service = service;
    }

    @GetMapping
    public List<Trainer> getAll() {
        return service.getAll();
    }

    @GetMapping("/slug/{slug}")
    public Trainer getBySlug(@PathVariable String slug) {
        return service.getBySlug(slug);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Trainer create(@RequestBody Trainer trainer) {
        return service.save(trainer);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Trainer update(@PathVariable Long id, @RequestBody Trainer trainer) {
        return service.update(id, trainer);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}