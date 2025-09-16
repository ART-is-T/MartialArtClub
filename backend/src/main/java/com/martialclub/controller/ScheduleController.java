package com.martialclub.controller;

import com.martialclub.model.ScheduleEntry;
import com.martialclub.service.ScheduleService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {
    private final ScheduleService service;

    public ScheduleController(ScheduleService service) {
        this.service = service;
    }

    // Просмотр расписания (любой авторизованный пользователь)
    @GetMapping
    public List<ScheduleEntry> getAll() {
        return service.getAll();
    }

    // Добавление новой записи (только Админ)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ScheduleEntry create(@RequestBody ScheduleEntry entry) {
        return service.save(entry);
    }

    // Обновление (только Админ)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ScheduleEntry update(@PathVariable Long id, @RequestBody ScheduleEntry entry) {
        return service.update(id, entry);
    }

    // Удаление (только Админ)
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}