package com.shiftplanner.shiftplanner.repository;

import com.shiftplanner.shiftplanner.entity.Employee;
import com.shiftplanner.shiftplanner.entity.Roster;
import com.shiftplanner.shiftplanner.entity.Shift;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface RosterRepository extends JpaRepository<Roster, Long> {

    List<Roster> findByEmployee(Employee employee);

    List<Roster> findByShift(Shift shift);

    List<Roster> findByEmployeeAndShift_Date(Employee employee, LocalDate date);
}