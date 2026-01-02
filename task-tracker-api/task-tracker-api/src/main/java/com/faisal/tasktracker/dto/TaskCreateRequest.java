package com.faisal.tasktracker.dto;

import com.faisal.tasktracker.model.TaskStatus;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

public record TaskCreateRequest(

        @NotBlank(message = "Title is required")
        @Size(max = 200)
        String title,

        @Size(max = 1000)
        String description,

        TaskStatus status, // Can be null → default in service to IN_PROGRESS

        @Positive(message = "Estimated hours must be positive")
        @Max(1000)
        Integer estimatedHours,

        @NotNull(message = "Target date is required")
        @FutureOrPresent(message = "Target date cannot be in the past")
        LocalDate targetDate,

        @NotBlank(message = "Assignee email is required")
        @Email(message = "Invalid email format")
        @Size(max = 255)
        String assignedUserEmail

) {}