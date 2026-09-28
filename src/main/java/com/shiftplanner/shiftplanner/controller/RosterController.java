package com.shiftplanner.shiftplanner.controller;

import com.shiftplanner.shiftplanner.entity.Roster;
import com.shiftplanner.shiftplanner.service.RosterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rosters")
public class RosterController {

    private final RosterService rosterService;

    public RosterController(RosterService rosterService) {
        this.rosterService = rosterService;
    }

    @PostMapping("/assign")
    public ResponseEntity<Roster> assignEmployeeToShift(
            @RequestParam Long employeeId,
            @RequestParam Long shiftId) {

        Roster roster = rosterService.assignEmployeeToShift(
                employeeId,
                shiftId
        );

        return new ResponseEntity<>(
                roster,
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<Roster>> getAllRosters() {

        return ResponseEntity.ok(
                rosterService.getAllRosters()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Roster> getRosterById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                rosterService.getRosterById(id)
        );
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Roster>> getRostersByEmployee(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                rosterService.getRostersByEmployee(employeeId)
        );
    }
}