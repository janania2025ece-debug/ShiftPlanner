package com.shiftplanner.shiftplanner.controller;

import com.shiftplanner.shiftplanner.entity.Shift;
import com.shiftplanner.shiftplanner.service.ShiftService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shifts")
public class ShiftController {

    private final ShiftService shiftService;

    public ShiftController(ShiftService shiftService) {
        this.shiftService = shiftService;
    }

    @PostMapping
    public ResponseEntity<Shift> createShift(
            @RequestBody Shift shift) {

        Shift createdShift = shiftService.createShift(shift);

        return new ResponseEntity<>(
                createdShift,
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<Shift>> getAllShifts() {

        return ResponseEntity.ok(
                shiftService.getAllShifts()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shift> getShiftById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                shiftService.getShiftById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Shift> updateShift(
            @PathVariable Long id,
            @RequestBody Shift shift) {

        return ResponseEntity.ok(
                shiftService.updateShift(id, shift)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteShift(
            @PathVariable Long id) {

        shiftService.deleteShift(id);

        return ResponseEntity.ok(
                "Shift deleted successfully."
        );
    }
}