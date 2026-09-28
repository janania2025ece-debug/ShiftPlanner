package com.shiftplanner.shiftplanner.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "swap_requests")
public class SwapRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "requester_id", nullable = false)
    private Employee requester;

    @ManyToOne
    @JoinColumn(name = "target_employee_id", nullable = false)
    private Employee targetEmployee;

    @ManyToOne
    @JoinColumn(name = "requester_roster_id", nullable = false)
    private Roster requesterRoster;

    @ManyToOne
    @JoinColumn(name = "target_roster_id", nullable = false)
    private Roster targetRoster;

    private String reason;

    @Enumerated(EnumType.STRING)
    private ColleagueStatus colleagueStatus;

    @Enumerated(EnumType.STRING)
    private ManagerStatus managerStatus;

    @Enumerated(EnumType.STRING)
    private OverallStatus overallStatus;

    private LocalDateTime createdAt;

    public enum ColleagueStatus {
        PENDING,
        ACCEPTED,
        DECLINED
    }

    public enum ManagerStatus {
        PENDING,
        APPROVED,
        REJECTED
    }

    public enum OverallStatus {
        PENDING,
        COMPLETED,
        REJECTED
    }

    public SwapRequest() {
    }

    public SwapRequest(Employee requester,
                       Employee targetEmployee,
                       Roster requesterRoster,
                       Roster targetRoster,
                       String reason) {

        this.requester = requester;
        this.targetEmployee = targetEmployee;
        this.requesterRoster = requesterRoster;
        this.targetRoster = targetRoster;
        this.reason = reason;

        this.colleagueStatus = ColleagueStatus.PENDING;
        this.managerStatus = ManagerStatus.PENDING;
        this.overallStatus = OverallStatus.PENDING;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public Employee getRequester() {
        return requester;
    }

    public void setRequester(Employee requester) {
        this.requester = requester;
    }

    public Employee getTargetEmployee() {
        return targetEmployee;
    }

    public void setTargetEmployee(Employee targetEmployee) {
        this.targetEmployee = targetEmployee;
    }

    public Roster getRequesterRoster() {
        return requesterRoster;
    }

    public void setRequesterRoster(Roster requesterRoster) {
        this.requesterRoster = requesterRoster;
    }

    public Roster getTargetRoster() {
        return targetRoster;
    }

    public void setTargetRoster(Roster targetRoster) {
        this.targetRoster = targetRoster;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public ColleagueStatus getColleagueStatus() {
        return colleagueStatus;
    }

    public void setColleagueStatus(ColleagueStatus colleagueStatus) {
        this.colleagueStatus = colleagueStatus;
    }

    public ManagerStatus getManagerStatus() {
        return managerStatus;
    }

    public void setManagerStatus(ManagerStatus managerStatus) {
        this.managerStatus = managerStatus;
    }

    public OverallStatus getOverallStatus() {
        return overallStatus;
    }

    public void setOverallStatus(OverallStatus overallStatus) {
        this.overallStatus = overallStatus;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}