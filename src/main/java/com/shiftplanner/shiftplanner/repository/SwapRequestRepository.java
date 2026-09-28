package com.shiftplanner.shiftplanner.repository;

import com.shiftplanner.shiftplanner.entity.Employee;
import com.shiftplanner.shiftplanner.entity.SwapRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SwapRequestRepository extends JpaRepository<SwapRequest, Long> {

    List<SwapRequest> findByRequester(Employee requester);

    List<SwapRequest> findByTargetEmployee(Employee targetEmployee);

    List<SwapRequest> findByRequesterOrTargetEmployee(
            Employee requester,
            Employee targetEmployee
    );
}