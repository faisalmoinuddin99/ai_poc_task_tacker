package com.faisal.tasktracker.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    private Integer priority;

    private Integer estimatedHours;

    private LocalDate targetDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to_id")
    private User assignedTo;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // ==================== Constructors ====================

    /** Default no-arg constructor required by JPA */
    public Task() {
    }

    /** Full constructor for convenience (replaces @AllArgsConstructor) */
    public Task(Long id, String title, String description, TaskStatus status,
                Integer priority, Integer estimatedHours, LocalDate targetDate,
                User assignedTo, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.estimatedHours = estimatedHours;
        this.targetDate = targetDate;
        this.assignedTo = assignedTo;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // ==================== Getters ====================

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public Integer getPriority() {
        return priority;
    }

    public Integer getEstimatedHours() {
        return estimatedHours;
    }

    public LocalDate getTargetDate() {
        return targetDate;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    // ==================== Setters ====================

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public void setEstimatedHours(Integer estimatedHours) {
        this.estimatedHours = estimatedHours;
    }

    public void setTargetDate(LocalDate targetDate) {
        this.targetDate = targetDate;
    }

    public void setAssignedTo(User assignedTo) {
        this.assignedTo = assignedTo;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // ==================== JPA Callbacks ====================

    @PrePersist
    void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) {
            status = TaskStatus.TODO;
        }
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // ==================== equals, hashCode, toString ====================

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return Objects.equals(id, task.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", status=" + status +
                ", priority=" + priority +
                ", targetDate=" + targetDate +
                ", assignedTo=" + (assignedTo != null ? assignedTo.getId() : null) +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }

    // ==================== Builder Pattern (manual replacement for @Builder) ====================

    public static class Builder {
        private Long id;
        private String title;
        private String description;
        private TaskStatus status;
        private Integer priority;
        private Integer estimatedHours;
        private LocalDate targetDate;
        private User assignedTo;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder title(String title) {
            this.title = title;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Builder status(TaskStatus status) {
            this.status = status;
            return this;
        }

        public Builder priority(Integer priority) {
            this.priority = priority;
            return this;
        }

        public Builder estimatedHours(Integer estimatedHours) {
            this.estimatedHours = estimatedHours;
            return this;
        }

        public Builder targetDate(LocalDate targetDate) {
            this.targetDate = targetDate;
            return this;
        }

        public Builder assignedTo(User assignedTo) {
            this.assignedTo = assignedTo;
            return this;
        }

        public Builder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Builder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public Task build() {
            Task task = new Task();
            task.id = this.id;
            task.title = this.title;
            task.description = this.description;
            task.status = this.status;
            task.priority = this.priority;
            task.estimatedHours = this.estimatedHours;
            task.targetDate = this.targetDate;
            task.assignedTo = this.assignedTo;
            task.createdAt = this.createdAt;
            task.updatedAt = this.updatedAt;
            return task;
        }
    }

    // Static factory method to start the builder
    public static Builder builder() {
        return new Builder();
    }
}