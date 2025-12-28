package com.faisal.tasktracker.controller;

import com.faisal.tasktracker.dto.TaskCreateRequest;
import com.faisal.tasktracker.dto.TaskResponse;
import com.faisal.tasktracker.model.Task;
import com.faisal.tasktracker.model.TaskStatus;
import com.faisal.tasktracker.model.User;
import com.faisal.tasktracker.service.TaskService;
import com.faisal.tasktracker.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;

    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    @PostMapping
    public TaskResponse createTask(@RequestBody TaskCreateRequest request) {
        return taskService.createTaskFromRequest(request);
    }

    @GetMapping("/user/{email}")
    public List<TaskResponse> getTasksForUser(@PathVariable String email) {
        return taskService.getTasksForUser(email);
    }

    @GetMapping("/user/{email}/status/{status}")
    public List<TaskResponse> getTasksByStatus(
            @PathVariable String email,
            @PathVariable TaskStatus status
    ) {
        return taskService.getUserTasksByStatus(email, status);
    }
}