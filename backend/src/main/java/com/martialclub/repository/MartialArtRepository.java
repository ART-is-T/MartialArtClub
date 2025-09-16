package com.martialclub.repository;

import com.martialclub.model.MartialArt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MartialArtRepository extends JpaRepository<MartialArt, Long> {
    Optional<MartialArt> findBySlug(String slug);
}