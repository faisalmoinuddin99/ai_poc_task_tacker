package com.faisal.tasktracker.repository;

import com.faisal.tasktracker.model.ComplianceLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface ComplianceLogRepository extends JpaRepository<ComplianceLog, Long> {

    Optional<ComplianceLog> findByUserIdAndDate(Long userId, LocalDate date);
}
