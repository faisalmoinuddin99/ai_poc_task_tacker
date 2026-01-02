package com.faisal.tasktracker.service;

import com.faisal.tasktracker.dto.TaskCreateRequest;
import com.faisal.tasktracker.dto.TaskMapper;
import com.faisal.tasktracker.dto.TaskResponse;
import com.faisal.tasktracker.exception.UserNotFoundException;
import com.faisal.tasktracker.model.Task;
import com.faisal.tasktracker.model.TaskStatus;
import com.faisal.tasktracker.model.User;
import com.faisal.tasktracker.repository.TaskRepository;
import com.faisal.tasktracker.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true) // All reads are transactional; writes will override
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    /**
     * Creates a new task from the validated request DTO.
     * Ensures assignee exists and defaults status to IN_PROGRESS if null.
     */
    @Transactional
    public TaskResponse createTaskFromRequest(TaskCreateRequest request) {
        // Find assignee - throw proper exception if not found
        User assignee = userRepository.findByEmail(request.assignedUserEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + request.assignedUserEmail()));

        // Default status if not provided
        TaskStatus status = request.status() != null ? request.status() : TaskStatus.IN_PROGRESS;

        Task task = Task.builder()
                .title(request.title())
                .description(request.description())
                .status(status)
                .estimatedHours(request.estimatedHours())
                .targetDate(request.targetDate())
                .assignedTo(assignee)
                .build();

        Task savedTask = taskRepository.save(task);
        return TaskMapper.toResponse(savedTask);
    }

    /**
     * Get all tasks assigned to a user by email
     */
    public List<TaskResponse> getTasksForUser(String email) {
        User user = findUserByEmailOrThrow(email);
        return taskRepository.findByAssignedTo(Optional.ofNullable(user))
                .stream()
                .map(TaskMapper::toResponse)
                .toList();
    }

    /**
     * Get tasks for a user filtered by status
     */
    public List<TaskResponse> getUserTasksByStatus(String email, TaskStatus status) {
        User user = findUserByEmailOrThrow(email);
        return taskRepository.findByAssignedToAndStatus(user, status)
                .stream()
                .map(TaskMapper::toResponse)
                .toList();
    }

    /**
     * Get all tasks in the system (admin/overview use)
     */
    public List<TaskResponse> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(TaskMapper::toResponse)
                .toList();
    }

    // Helper method to avoid duplication
    private User findUserByEmailOrThrow(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
    }
}