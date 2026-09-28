package com.shiftplanner.shiftplanner.service;

import com.shiftplanner.shiftplanner.entity.Employee;
import com.shiftplanner.shiftplanner.entity.Roster;
import com.shiftplanner.shiftplanner.entity.Shift;
import com.shiftplanner.shiftplanner.repository.EmployeeRepository;
import com.shiftplanner.shiftplanner.repository.RosterRepository;
import com.shiftplanner.shiftplanner.repository.ShiftRepository;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;

@Service
public class RosterService {

    private final RosterRepository rosterRepository;
    private final EmployeeRepository employeeRepository;
    private final ShiftRepository shiftRepository;

    public RosterService(
            RosterRepository rosterRepository,
            EmployeeRepository employeeRepository,
            ShiftRepository shiftRepository) {

        this.rosterRepository = rosterRepository;
        this.employeeRepository = employeeRepository;
        this.shiftRepository = shiftRepository;
    }

    public Roster assignEmployeeToShift(Long employeeId, Long shiftId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found with id: " + employeeId));

        Shift shift = shiftRepository.findById(shiftId)
                .orElseThrow(() ->
                        new RuntimeException("Shift not found with id: " + shiftId));

        List<Roster> existingRosters =
                rosterRepository.findByEmployeeAndShift_Date(
                        employee,
                        shift.getDate()
                );

        for (Roster roster : existingRosters) {

            Shift existingShift = roster.getShift();

            if (isOverlapping(
                    existingShift.getStartTime(),
                    existingShift.getEndTime(),
                    shift.getStartTime(),
                    shift.getEndTime())) {

                throw new RuntimeException(
                        "Employee already has an overlapping shift on this date."
                );
            }
        }

        Roster roster = new Roster(
                employee,
                shift,
                Roster.Status.ASSIGNED
        );

        return rosterRepository.save(roster);
    }

    private boolean isOverlapping(
            LocalTime existingStart,
            LocalTime existingEnd,
            LocalTime newStart,
            LocalTime newEnd) {

        return existingStart.isBefore(newEnd)
                && newStart.isBefore(existingEnd);
    }

    public List<Roster> getAllRosters() {
        return rosterRepository.findAll();
    }

    public Roster getRosterById(Long id) {

        return rosterRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Roster not found with id: " + id));
    }

    public List<Roster> getRostersByEmployee(Long employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found with id: " + employeeId));

        return rosterRepository.findByEmployee(employee);
    }
}