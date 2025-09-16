package com.martialclub.service;

import com.martialclub.model.ScheduleEntry;
import com.martialclub.repository.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {
    private final ScheduleRepository repository;

    public ScheduleService(ScheduleRepository repository) {
        this.repository = repository;
    }

    public List<ScheduleEntry> getAll() {
        return repository.findAll();
    }

    public ScheduleEntry save(ScheduleEntry entry) {
        return repository.save(entry);
    }

    public ScheduleEntry update(Long id, ScheduleEntry updated) {
        ScheduleEntry existing = repository.findById(id).orElseThrow();
        existing.setDate(updated.getDate());
        existing.setStartTime(updated.getStartTime());
        existing.setEndTime(updated.getEndTime());
        existing.setMartialArt(updated.getMartialArt());
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}