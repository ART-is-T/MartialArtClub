package com.martialclub.repository;

import com.martialclub.model.ScheduleEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<ScheduleEntry, Long> {
}