package com.faisal.tasktracker.controller;

import com.faisal.tasktracker.dto.TaskCreateRequest;
import com.faisal.tasktracker.dto.TaskResponse;
import com.faisal.tasktracker.model.TaskStatus;
import com.faisal.tasktracker.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@Valid @RequestBody TaskCreateRequest request) {
        TaskResponse createdTask = taskService.createTaskFromRequest(request);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED); // 201 Created
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<TaskResponse>> getTasksForUser(@PathVariable String email) {
        List<TaskResponse> tasks = taskService.getTasksForUser(email);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/user/{email}/status/{status}")
    public ResponseEntity<List<TaskResponse>> getTasksByStatus(
            @PathVariable String email,
            @PathVariable TaskStatus status) {
        List<TaskResponse> tasks = taskService.getUserTasksByStatus(email, status);
        return ResponseEntity.ok(tasks);
    }

    // Handle OPTIONS preflight for CORS
    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handleOptions() {
        return ResponseEntity.ok().build();
    }
}