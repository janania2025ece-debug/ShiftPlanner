package com.shiftplanner.shiftplanner.dto;

import jakarta.validation.constraints.NotNull;
public class SwapRequestDto {

    @NotNull(message = "Requester employee ID is required")
    private Long requesterEmployeeId;

    @NotNull(message = "Target employee ID is required")
    private Long targetEmployeeId;

    @NotNull(message = "Roster ID is required")
    private Long rosterId;

    public SwapRequestDto() {
    }

    public Long getRequesterEmployeeId() {
        return requesterEmployeeId;
    }

    public void setRequesterEmployeeId(Long requesterEmployeeId) {
        this.requesterEmployeeId = requesterEmployeeId;
    }

    public Long getTargetEmployeeId() {
        return targetEmployeeId;
    }

    public void setTargetEmployeeId(Long targetEmployeeId) {
        this.targetEmployeeId = targetEmployeeId;
    }

    public Long getRosterId() {
        return rosterId;
    }

    public void setRosterId(Long rosterId) {
        this.rosterId = rosterId;
    }
}
