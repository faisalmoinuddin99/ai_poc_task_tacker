package com.faisal.tasktracker.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class TaskResponse {

    private Long id;
    private String title;
    private String description;
    private String status;
    private Integer estimatedHours;
    private LocalDate targetDate;
    private UserSummary assignedTo;
    private LocalDateTime createdAt;

    public TaskResponse() {
    }

    public TaskResponse(
            Long id,
            String title,
            String description,
            String status,
            Integer estimatedHours,
            LocalDate targetDate,
            UserSummary assignedTo,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.estimatedHours = estimatedHours;
        this.targetDate = targetDate;
        this.assignedTo = assignedTo;
        this.createdAt = createdAt;
    }

    // getters & setters below

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getEstimatedHours() {
        return estimatedHours;
    }

    public void setEstimatedHours(Integer estimatedHours) {
        this.estimatedHours = estimatedHours;
    }

    public LocalDate getTargetDate() {
        return targetDate;
    }

    public void setTargetDate(LocalDate targetDate) {
        this.targetDate = targetDate;
    }

    public UserSummary getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(UserSummary assignedTo) {
        this.assignedTo = assignedTo;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
