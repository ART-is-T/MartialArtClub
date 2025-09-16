package com.martialclub.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;       // день проведения
    private LocalTime startTime;  // время начала
    private LocalTime endTime;    // время окончания
    private String martialArt;    // каратэ, айкидо и т.п.
}