package com.faisal.tasktracker.service;

import com.faisal.tasktracker.model.*;
import com.faisal.tasktracker.repository.ComplianceLogRepository;
import com.faisal.tasktracker.repository.TaskRepository;
import com.faisal.tasktracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ComplianceService {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final ComplianceLogRepository complianceLogRepository;

    public ComplianceService(
            UserRepository userRepository,
            TaskRepository taskRepository,
            ComplianceLogRepository complianceLogRepository
    ) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.complianceLogRepository = complianceLogRepository;
    }

    public void checkDailyCompliance() {
        LocalDate today = LocalDate.now();

        List<User> users = userRepository.findAll();

        for (User user : users) {

            // Skip managers later if needed
            List<Task> activeTasks =
                    taskRepository.findByAssignedToAndStatus(user, TaskStatus.IN_PROGRESS);

            boolean compliant = true;
            String reason = "All active tasks updated";

            if (!activeTasks.isEmpty()) {
                // for now: NO update tracking → auto mark non-compliant
                compliant = false;
                reason = "No daily update provided for active tasks";
            }

            // avoid duplicate entries
            if (complianceLogRepository
                    .findByUserIdAndDate(user.getId(), today)
                    .isPresent()) {
                continue;
            }

            ComplianceLog log = new ComplianceLog();
            log.setUser(user);
            log.setDate(today);
            log.setCompliant(compliant);
            log.setReason(reason);

            complianceLogRepository.save(log);
        }
    }
}
