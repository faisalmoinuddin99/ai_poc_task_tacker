package com.faisal.tasktracker.service;

import com.faisal.tasktracker.dto.TaskCreateRequest;
import com.faisal.tasktracker.dto.TaskMapper;
import com.faisal.tasktracker.dto.TaskResponse;
import com.faisal.tasktracker.model.Task;
import com.faisal.tasktracker.model.TaskStatus;
import com.faisal.tasktracker.model.User;
import com.faisal.tasktracker.repository.TaskRepository;
import com.faisal.tasktracker.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public TaskResponse createTaskFromRequest(TaskCreateRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getAssignedUserEmail());
        User user = optionalUser.orElseThrow(() -> new RuntimeException("User not found with email: " + request.getAssignedUserEmail()));

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus())
                .estimatedHours(request.getEstimatedHours())
                .targetDate(request.getTargetDate())
                .assignedTo(user)
                .build();

        Task savedTask = taskRepository.save(task);
        return TaskMapper.toResponse(savedTask);
    }

    public List<TaskResponse> getTasksForUser(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return taskRepository.findByAssignedTo(user)
                .stream()
                .map(TaskMapper::toResponse)
                .toList();
    }

    public List<TaskResponse> getUserTasksByStatus(String email, TaskStatus status) {
        Optional<User> user = userRepository.findByEmail(email);
        return taskRepository.findByAssignedToAndStatus(user, status)
                .stream()
                .map(TaskMapper::toResponse)
                .toList();
    }

    // DTOs
    public List<TaskResponse> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(TaskMapper::toResponse)
                .toList();
    }
}