package com.faisal.tasktracker.service;

import com.faisal.tasktracker.model.ComplianceLog;
import com.faisal.tasktracker.model.Task;
import com.faisal.tasktracker.model.TaskStatus;
import com.faisal.tasktracker.model.User;
import com.faisal.tasktracker.repository.ComplianceLogRepository;
import com.faisal.tasktracker.repository.TaskRepository;
import com.faisal.tasktracker.repository.TaskUpdateRepository;
import com.faisal.tasktracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ComplianceService {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final TaskUpdateRepository taskUpdateRepository;
    private final ComplianceLogRepository complianceLogRepository;

    // Manual constructor injection (replaces @RequiredArgsConstructor)
    public ComplianceService(
            UserRepository userRepository,
            TaskRepository taskRepository,
            TaskUpdateRepository taskUpdateRepository,
            ComplianceLogRepository complianceLogRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.taskUpdateRepository = taskUpdateRepository;
        this.complianceLogRepository = complianceLogRepository;
    }

    public void checkDailyCompliance(LocalDate date) {

        List<User> users = userRepository.findAll();

        for (User user : users) {

            List<Task> activeTasks =
                    taskRepository.findByAssignedToAndStatus(Optional.ofNullable(user), TaskStatus.IN_PROGRESS);

            boolean compliant = true;
            String reason = "All tasks updated";

            for (Task task : activeTasks) {
                boolean updated = taskUpdateRepository
                        .findByTaskIdAndUserIdAndUpdateDate(
                                task.getId(),
                                user.getId(),
                                date
                        ).isPresent();

                if (!updated) {
                    compliant = false;
                    reason = "No update for task: " + task.getTitle();
                    break;
                }
            }

            // Create ComplianceLog manually using constructor or setters
            ComplianceLog log = new ComplianceLog();
            log.setUser(user);
            log.setDate(date);
            log.setCompliant(compliant);
            log.setReason(reason);

            complianceLogRepository.save(log);
        }
    }
}