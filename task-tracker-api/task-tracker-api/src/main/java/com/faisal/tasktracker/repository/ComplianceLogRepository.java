package com.faisal.tasktracker.repository;

import com.faisal.tasktracker.model.ComplianceLog;
import com.faisal.tasktracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ComplianceLogRepository extends JpaRepository<ComplianceLog, Long> {

    List<ComplianceLog> findByUserAndDate(User user, LocalDate date);

    List<ComplianceLog> findByDate(LocalDate date);
}
