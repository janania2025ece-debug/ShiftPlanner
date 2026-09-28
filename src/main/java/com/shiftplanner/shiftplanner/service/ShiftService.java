package com.shiftplanner.shiftplanner.service;

import com.shiftplanner.shiftplanner.entity.Shift;
import com.shiftplanner.shiftplanner.repository.ShiftRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShiftService {

    private final ShiftRepository shiftRepository;

    public ShiftService(ShiftRepository shiftRepository) {
        this.shiftRepository = shiftRepository;
    }

    public Shift createShift(Shift shift) {
        return shiftRepository.save(shift);
    }

    public List<Shift> getAllShifts() {
        return shiftRepository.findAll();
    }

    public Shift getShiftById(Long id) {
        return shiftRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Shift not found with id: " + id));
    }

    public Shift updateShift(Long id, Shift updatedShift) {

        Shift existingShift = getShiftById(id);

        existingShift.setName(updatedShift.getName());
        existingShift.setDate(updatedShift.getDate());
        existingShift.setStartTime(updatedShift.getStartTime());
        existingShift.setEndTime(updatedShift.getEndTime());

        return shiftRepository.save(existingShift);
    }

    public void deleteShift(Long id) {

        Shift shift = getShiftById(id);

        shiftRepository.delete(shift);
    }
}