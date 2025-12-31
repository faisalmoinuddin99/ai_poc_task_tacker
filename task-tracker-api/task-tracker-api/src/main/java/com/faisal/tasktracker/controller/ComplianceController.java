package com.faisal.tasktracker.controller;

import com.faisal.tasktracker.service.ComplianceService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/compliance")
public class ComplianceController {

    private final ComplianceService complianceService;

    public ComplianceController(ComplianceService complianceService) {
        this.complianceService = complianceService;
    }

    @PostMapping("/run")
    public String runNow() {
        complianceService.checkDailyCompliance();
        return "Compliance check executed";
    }
}
