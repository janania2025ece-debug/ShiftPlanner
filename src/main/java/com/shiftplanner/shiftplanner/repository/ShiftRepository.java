package com.shiftplanner.shiftplanner.repository;

import com.shiftplanner.shiftplanner.entity.Shift;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShiftRepository extends JpaRepository<Shift, Long> {
}