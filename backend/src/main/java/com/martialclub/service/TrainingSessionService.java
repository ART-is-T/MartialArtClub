package com.martialclub.service;

import com.martialclub.model.TrainingSession;
import com.martialclub.repository.TrainingSessionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainingSessionService {
    private final TrainingSessionRepository repository;

    public TrainingSessionService(TrainingSessionRepository repository) {
        this.repository = repository;
    }

    public TrainingSession createSession(TrainingSession session) {
        return repository.save(session);
    }

    public List<TrainingSession> getAllSessions() {
        return repository.findAll();
    }
}