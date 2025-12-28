package com.faisal.tasktracker.dto;

import com.faisal.tasktracker.model.TaskStatus;

import java.time.LocalDate;

public class TaskCreateRequest {

    private String title;
    private String description;
    private TaskStatus status;
    private Integer estimatedHours;
    private LocalDate targetDate;
    private String assignedUserEmail;

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

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
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

    public String getAssignedUserEmail() {
        return assignedUserEmail;
    }

    public void setAssignedUserEmail(String assignedUserEmail) {
        this.assignedUserEmail = assignedUserEmail;
    }

    @Override
    public String toString() {
        return "TaskCreateRequest{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", status=" + status +
                ", estimatedHours=" + estimatedHours +
                ", targetDate=" + targetDate +
                ", assignedUserEmail='" + assignedUserEmail + '\'' +
                '}';
    }
}
