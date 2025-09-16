package com.martialclub.service;

import com.martialclub.model.MartialArt;
import com.martialclub.repository.MartialArtRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MartialArtService {
    private final MartialArtRepository repository;

    public MartialArtService(MartialArtRepository repository) {
        this.repository = repository;
    }

    public List<MartialArt> getAll() {
        return repository.findAll();
    }

    public MartialArt getBySlug(String slug) {
        return repository.findBySlug(slug)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Martial art not found"));
    }

    public MartialArt save(MartialArt art) {
        return repository.save(art);
    }

    public MartialArt update(Long id, MartialArt updated) {
        MartialArt existing = repository.findById(id).orElseThrow();
        existing.setTitle(updated.getTitle());
        existing.setSlug(updated.getSlug());
        existing.setDescription(updated.getDescription());
        existing.setBgImage(updated.getBgImage());
        existing.setIconImage(updated.getIconImage());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}