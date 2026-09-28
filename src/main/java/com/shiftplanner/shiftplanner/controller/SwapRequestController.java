package com.shiftplanner.shiftplanner.controller;

import com.shiftplanner.shiftplanner.entity.SwapRequest;
import com.shiftplanner.shiftplanner.service.SwapRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/swaps")
public class SwapRequestController {

    private final SwapRequestService swapRequestService;

    public SwapRequestController(SwapRequestService swapRequestService) {
        this.swapRequestService = swapRequestService;
    }

    @PostMapping
    public ResponseEntity<SwapRequest> createSwapRequest(
            @RequestParam Long requesterId,
            @RequestParam Long targetEmployeeId,
            @RequestParam Long requesterRosterId,
            @RequestParam Long targetRosterId,
            @RequestParam(required = false) String reason) {

        SwapRequest swapRequest = swapRequestService.createSwapRequest(
                requesterId,
                targetEmployeeId,
                requesterRosterId,
                targetRosterId,
                reason
        );

        return new ResponseEntity<>(
                swapRequest,
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<SwapRequest>> getAllSwapRequests() {

        return ResponseEntity.ok(
                swapRequestService.getAllSwapRequests()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<SwapRequest> getSwapRequestById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                swapRequestService.getSwapRequestById(id)
        );
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<SwapRequest>> getSwapRequestsByEmployee(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                swapRequestService.getSwapRequestsByEmployee(employeeId)
        );
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<SwapRequest> acceptSwapRequest(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                swapRequestService.acceptSwapRequest(id)
        );
    }

    @PutMapping("/{id}/decline")
    public ResponseEntity<SwapRequest> declineSwapRequest(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                swapRequestService.declineSwapRequest(id)
        );
    }

    @PutMapping("/{id}/manager/approve")
    public ResponseEntity<SwapRequest> approveByManager(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                swapRequestService.approveByManager(id)
        );
    }

    @PutMapping("/{id}/manager/reject")
    public ResponseEntity<SwapRequest> rejectByManager(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                swapRequestService.rejectByManager(id)
        );
    }
}