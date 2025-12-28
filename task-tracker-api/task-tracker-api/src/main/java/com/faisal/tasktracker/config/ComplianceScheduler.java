package com.faisal.tasktracker.config;

import com.faisal.tasktracker.service.ComplianceService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class ComplianceScheduler {

    private final ComplianceService complianceService;

    public ComplianceScheduler(ComplianceService complianceService) {
        this.complianceService = complianceService;
    }

    /* Runs every day at 11:59 PM - Actual Code
    @Scheduled(cron = "0 59 23 * * ?")
    public void runDailyComplianceCheck() {
        LocalDate yesterday = LocalDate.now().minusDays(1);
        System.out.println("Running daily compliance check for: " + yesterday);
        complianceService.checkDailyCompliance(yesterday);
    }

     */

    @Scheduled(cron = "0 * * * * ?")  // Every minute TEST
// @Scheduled(cron = "0 59 23 * * ?")  // Original: daily at 23:59
    public void runDailyComplianceCheck() {
//        LocalDate yesterday = LocalDate.now().minusDays(1);
        LocalDate testDate = LocalDate.of(2025, 12, 27);  // fixed date
        System.out.println("[TEST] Running compliance check for: " + testDate);
        complianceService.checkDailyCompliance(testDate);
    }
}