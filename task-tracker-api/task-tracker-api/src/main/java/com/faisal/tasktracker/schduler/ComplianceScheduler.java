package com.faisal.tasktracker.schduler;

import com.faisal.tasktracker.service.ComplianceService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ComplianceScheduler {

    private final ComplianceService complianceService;

    public ComplianceScheduler(ComplianceService complianceService) {
        this.complianceService = complianceService;
    }

    // Runs every day at 7 PM IST
    @Scheduled(cron = "0 0 19 * * ?", zone = "Asia/Kolkata")
    public void runDailyComplianceCheck() {
        complianceService.checkDailyCompliance();
    }
}