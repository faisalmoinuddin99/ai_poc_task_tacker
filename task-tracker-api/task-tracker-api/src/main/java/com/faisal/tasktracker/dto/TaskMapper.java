package com.faisal.tasktracker.dto;

import com.faisal.tasktracker.model.Task;

public class TaskMapper {

    public static TaskResponse toResponse(Task task) {
        TaskResponse dto = new TaskResponse();

        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus().name());
        dto.setEstimatedHours(task.getEstimatedHours());
        dto.setTargetDate(task.getTargetDate());
        dto.setCreatedAt(task.getCreatedAt());

        if (task.getAssignedTo() != null) {
            dto.setAssignedTo(
                    new UserSummary(
                            task.getAssignedTo().getId(),
                            task.getAssignedTo().getName(),
                            task.getAssignedTo().getEmail()
                    )
            );
        }

        return dto;
    }
}