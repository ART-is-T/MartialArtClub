package com.martialclub.controller;

import com.martialclub.model.TrainingSession;
import com.martialclub.service.TrainingSessionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class TrainingSessionController {
    private final TrainingSessionService service;

    public TrainingSessionController(TrainingSessionService service) {
        this.service = service;
    }

    @PostMapping
    public TrainingSession create(@RequestBody TrainingSession session) {
        return service.createSession(session);
    }

    @GetMapping
    public List<TrainingSession> getAll() {
        return service.getAllSessions();
    }
}