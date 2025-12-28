package com.faisal.tasktracker.service;


import com.faisal.tasktracker.model.Task;
import com.faisal.tasktracker.model.TaskUpdate;
import com.faisal.tasktracker.model.User;
import com.faisal.tasktracker.repository.TaskUpdateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class TaskUpdateService {

    private final TaskUpdateRepository taskUpdateRepository;

    public TaskUpdateService(TaskUpdateRepository taskUpdateRepository) {
        this.taskUpdateRepository = taskUpdateRepository;
    }

    public TaskUpdate addDailyUpdate(Task task, User user, String comment, Integer hours) {

        LocalDate today = LocalDate.now();

        taskUpdateRepository
                .findByTaskIdAndUserIdAndUpdateDate(task.getId(), user.getId(), today)
                .ifPresent(existing -> {
                    throw new RuntimeException("Daily update already submitted for this task.");
                });

        TaskUpdate update = TaskUpdate.builder()
                .task(task)
                .user(user)
                .updateDate(today)
                .comment(comment)
                .hoursSpent(hours)
                .build();

        return taskUpdateRepository.save(update);
    }
}
