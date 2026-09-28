package com.shiftplanner.shiftplanner.service;

import com.shiftplanner.shiftplanner.entity.Employee;
import com.shiftplanner.shiftplanner.entity.Roster;
import com.shiftplanner.shiftplanner.entity.SwapRequest;
import com.shiftplanner.shiftplanner.repository.EmployeeRepository;
import com.shiftplanner.shiftplanner.repository.RosterRepository;
import com.shiftplanner.shiftplanner.repository.SwapRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SwapRequestService {

    private final SwapRequestRepository swapRequestRepository;
    private final EmployeeRepository employeeRepository;
    private final RosterRepository rosterRepository;

    public SwapRequestService(
            SwapRequestRepository swapRequestRepository,
            EmployeeRepository employeeRepository,
            RosterRepository rosterRepository) {

        this.swapRequestRepository = swapRequestRepository;
        this.employeeRepository = employeeRepository;
        this.rosterRepository = rosterRepository;
    }

    public SwapRequest createSwapRequest(
            Long requesterId,
            Long targetEmployeeId,
            Long requesterRosterId,
            Long targetRosterId,
            String reason) {

        Employee requester = employeeRepository.findById(requesterId)
                .orElseThrow(() ->
                        new RuntimeException("Requester not found with id: " + requesterId));

        Employee targetEmployee = employeeRepository.findById(targetEmployeeId)
                .orElseThrow(() ->
                        new RuntimeException("Target employee not found with id: " + targetEmployeeId));

        Roster requesterRoster = rosterRepository.findById(requesterRosterId)
                .orElseThrow(() ->
                        new RuntimeException("Requester roster not found with id: " + requesterRosterId));

        Roster targetRoster = rosterRepository.findById(targetRosterId)
                .orElseThrow(() ->
                        new RuntimeException("Target roster not found with id: " + targetRosterId));

        if (!requesterRoster.getEmployee().getId().equals(requesterId)) {
            throw new RuntimeException(
                    "Requester is not assigned to the selected requester roster."
            );
        }

        if (!targetRoster.getEmployee().getId().equals(targetEmployeeId)) {
            throw new RuntimeException(
                    "Target employee is not assigned to the selected target roster."
            );
        }

        if (requesterId.equals(targetEmployeeId)) {
            throw new RuntimeException(
                    "An employee cannot request a swap with themselves."
            );
        }

        SwapRequest swapRequest = new SwapRequest(
                requester,
                targetEmployee,
                requesterRoster,
                targetRoster,
                reason
        );

        return swapRequestRepository.save(swapRequest);
    }

    public SwapRequest getSwapRequestById(Long id) {

        return swapRequestRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Swap request not found with id: " + id));
    }

    public List<SwapRequest> getAllSwapRequests() {
        return swapRequestRepository.findAll();
    }

    public List<SwapRequest> getSwapRequestsByEmployee(Long employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found with id: " + employeeId));

        return swapRequestRepository
                .findByRequesterOrTargetEmployee(employee, employee);
    }

    public SwapRequest acceptSwapRequest(Long id) {

        SwapRequest swapRequest = getSwapRequestById(id);

        if (swapRequest.getOverallStatus() != SwapRequest.OverallStatus.PENDING) {
            throw new RuntimeException(
                    "This swap request is no longer pending."
            );
        }

        if (swapRequest.getColleagueStatus() != SwapRequest.ColleagueStatus.PENDING) {
            throw new RuntimeException(
                    "This swap request has already been accepted or declined."
            );
        }

        swapRequest.setColleagueStatus(
                SwapRequest.ColleagueStatus.ACCEPTED
        );

        return swapRequestRepository.save(swapRequest);
    }

    public SwapRequest declineSwapRequest(Long id) {

        SwapRequest swapRequest = getSwapRequestById(id);

        if (swapRequest.getOverallStatus() != SwapRequest.OverallStatus.PENDING) {
            throw new RuntimeException(
                    "This swap request is no longer pending."
            );
        }

        if (swapRequest.getColleagueStatus() != SwapRequest.ColleagueStatus.PENDING) {
            throw new RuntimeException(
                    "This swap request has already been accepted or declined."
            );
        }

        swapRequest.setColleagueStatus(
                SwapRequest.ColleagueStatus.DECLINED
        );

        swapRequest.setOverallStatus(
                SwapRequest.OverallStatus.REJECTED
        );

        return swapRequestRepository.save(swapRequest);
    }

    public SwapRequest approveByManager(Long id) {

        SwapRequest swapRequest = getSwapRequestById(id);

        if (swapRequest.getOverallStatus() != SwapRequest.OverallStatus.PENDING) {
            throw new RuntimeException(
                    "This swap request is no longer pending."
            );
        }

        if (swapRequest.getColleagueStatus()
                != SwapRequest.ColleagueStatus.ACCEPTED) {

            throw new RuntimeException(
                    "Manager cannot approve until the colleague accepts the swap."
            );
        }

        if (swapRequest.getManagerStatus()
                != SwapRequest.ManagerStatus.PENDING) {

            throw new RuntimeException(
                    "This swap request has already been approved or rejected."
            );
        }

        swapRequest.setManagerStatus(
                SwapRequest.ManagerStatus.APPROVED
        );

        applySwap(swapRequest);

        swapRequest.setOverallStatus(
                SwapRequest.OverallStatus.COMPLETED
        );

        return swapRequestRepository.save(swapRequest);
    }

    public SwapRequest rejectByManager(Long id) {

        SwapRequest swapRequest = getSwapRequestById(id);

        if (swapRequest.getOverallStatus() != SwapRequest.OverallStatus.PENDING) {
            throw new RuntimeException(
                    "This swap request is no longer pending."
            );
        }

        if (swapRequest.getManagerStatus()
                != SwapRequest.ManagerStatus.PENDING) {

            throw new RuntimeException(
                    "This swap request has already been approved or rejected."
            );
        }

        swapRequest.setManagerStatus(
                SwapRequest.ManagerStatus.REJECTED
        );

        swapRequest.setOverallStatus(
                SwapRequest.OverallStatus.REJECTED
        );

        return swapRequestRepository.save(swapRequest);
    }

    private void applySwap(SwapRequest swapRequest) {

        Roster requesterRoster = swapRequest.getRequesterRoster();
        Roster targetRoster = swapRequest.getTargetRoster();

        Employee requester = requesterRoster.getEmployee();
        Employee targetEmployee = targetRoster.getEmployee();

        requesterRoster.setEmployee(targetEmployee);
        targetRoster.setEmployee(requester);

        requesterRoster.setStatus(Roster.Status.SWAPPED);
        targetRoster.setStatus(Roster.Status.SWAPPED);

        rosterRepository.save(requesterRoster);
        rosterRepository.save(targetRoster);
    }
}