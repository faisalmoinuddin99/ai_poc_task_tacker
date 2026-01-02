package com.faisal.tasktracker.service;

import com.faisal.tasktracker.model.Task;
import com.faisal.tasktracker.model.User;
import com.faisal.tasktracker.repository.TaskRepository;
import com.faisal.tasktracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskContextService {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    public TaskContextService(UserRepository userRepository, TaskRepository taskRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }

    /**
     * Builds context for tasks assigned to a user whose name contains the given token(s)
     */
    public String buildForUser(String nameToken) {
        List<User> users = userRepository.findByNameIgnoreCaseContaining(nameToken);

        if (users.isEmpty()) {
            List<String> allNames = userRepository.findAll()
                    .stream()
                    .map(User::getName)
                    .toList();

            return "No user found matching name '" + nameToken + "'.\n" +
                    "Available users: " +
                    (allNames.isEmpty() ? "none" : String.join(", ", allNames));
        }

        // Use the first matching user (you can enhance this later for multiple matches)
        User user = users.get(0);
        List<Task> tasks = taskRepository.findByAssignedTo(user);

        return buildContext("Tasks assigned to " + user.getName(), tasks);
    }

    /**
     * Builds context for tasks with target date in the given range
     */
    public String buildForDateRange(LocalDate from, LocalDate to) {
        List<Task> tasks = taskRepository.findByTargetDateBetween(from, to);
        return buildContext(
                "Tasks with target date between " + from + " and " + to,
                tasks
        );
    }

    /**
     * Builds context for all tasks in the system
     */
    public String buildForAll() {
        List<Task> tasks = taskRepository.findAll();
        return buildContext("All tasks in the system", tasks);
    }

    /**
     * Helper to format a list of tasks into readable text for the AI
     */
    private String buildContext(String header, List<Task> tasks) {
        if (tasks.isEmpty()) {
            return header + ":\nNo tasks found.";
        }

        StringBuilder sb = new StringBuilder(header + " (" + tasks.size() + " tasks):\n\n");

        for (Task task : tasks) {
            String assignee = task.getAssignedTo() != null
                    ? task.getAssignedTo().getName()
                    : "Unassigned";

            String priority = task.getPriority() == null
                    ? "Normal"
                    : switch (task.getPriority()) {
                case 1 -> "Critical";
                case 2 -> "High";
                case 3 -> "Medium";
                case 4 -> "Low";
                default -> "P" + task.getPriority();
            };

            sb.append(String.format(
                    "• [%s] %s\n" +
                            "  Status: %s | Priority: %s | Target Date: %s\n" +
                            "  Assignee: %s | Estimated: %s hours\n" +
                            "  Description: %s\n\n",
                    task.getId(),
                    task.getTitle(),
                    task.getStatus(),
                    priority,
                    task.getTargetDate() != null ? task.getTargetDate() : "Not set",
                    assignee,
                    task.getEstimatedHours() != null ? task.getEstimatedHours() : "—",
                    task.getDescription() != null ? task.getDescription().trim() : "No description"
            ));
        }

        return sb.toString();
    }
}