package com.martialclub.controller;

import com.martialclub.model.MartialArt;
import com.martialclub.service.MartialArtService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/martial-arts")
public class MartialArtController {
    private final MartialArtService service;

    public MartialArtController(MartialArtService service) {
        this.service = service;
    }

    @GetMapping
    public List<MartialArt> getAll() {
        return service.getAll();
    }

    @GetMapping("/slug/{slug}")
    public MartialArt getBySlug(@PathVariable String slug) {
        return service.getBySlug(slug);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public MartialArt create(@RequestBody MartialArt art) {
        return service.save(art);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public MartialArt update(@PathVariable Long id, @RequestBody MartialArt art) {
        return service.update(id, art);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}