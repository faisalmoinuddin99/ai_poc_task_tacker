package com.faisal.tasktracker.controller;

import com.faisal.tasktracker.model.Task;
import com.faisal.tasktracker.model.TaskUpdate;
import com.faisal.tasktracker.model.User;
import com.faisal.tasktracker.repository.TaskRepository;
import com.faisal.tasktracker.service.TaskUpdateService;
import com.faisal.tasktracker.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/task-updates")
public class TaskUpdateController {

    private final TaskUpdateService taskUpdateService;
    private final UserService userService;
    private final TaskRepository taskRepository;

    public TaskUpdateController(TaskUpdateService taskUpdateService, UserService userService, TaskRepository taskRepository) {
        this.taskUpdateService = taskUpdateService;
        this.userService = userService;
        this.taskRepository = taskRepository;
    }

    @PostMapping
    public TaskUpdate addDailyUpdate(
            @RequestParam Long taskId,
            @RequestParam String userEmail,
            @RequestParam String comment,
            @RequestParam Integer hours
    ) {

        User user = userService.getByEmail(userEmail);
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        return taskUpdateService.addDailyUpdate(task, user, comment, hours);
    }
}