package com.faisal.tasktracker.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(
        name = "task_updates",
        indexes = {
                @Index(name = "idx_task_date", columnList = "task_id, updateDate"),
                @Index(name = "idx_user_date", columnList = "user_id, updateDate")
        }
)
public class TaskUpdate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDate updateDate;

    @Column(length = 2000)
    private String comment;

    private Integer hoursSpent;

    // ==================== Constructors ====================

    /** Default no-arg constructor required by JPA */
    public TaskUpdate() {
    }

    /** Full constructor (replaces @AllArgsConstructor) */
    public TaskUpdate(Long id, Task task, User user, LocalDate updateDate,
                      String comment, Integer hoursSpent) {
        this.id = id;
        this.task = task;
        this.user = user;
        this.updateDate = updateDate;
        this.comment = comment;
        this.hoursSpent = hoursSpent;
    }

    // ==================== Getters ====================

    public Long getId() {
        return id;
    }

    public Task getTask() {
        return task;
    }

    public User getUser() {
        return user;
    }

    public LocalDate getUpdateDate() {
        return updateDate;
    }

    public String getComment() {
        return comment;
    }

    public Integer getHoursSpent() {
        return hoursSpent;
    }

    // ==================== Setters ====================

    public void setId(Long id) {
        this.id = id;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setUpdateDate(LocalDate updateDate) {
        this.updateDate = updateDate;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setHoursSpent(Integer hoursSpent) {
        this.hoursSpent = hoursSpent;
    }

    // ==================== equals, hashCode, toString ====================

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TaskUpdate that = (TaskUpdate) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "TaskUpdate{" +
                "id=" + id +
                ", task=" + (task != null ? task.getId() : null) +
                ", user=" + (user != null ? user.getId() : null) +
                ", updateDate=" + updateDate +
                ", hoursSpent=" + hoursSpent +
                '}';
    }

    // ==================== Manual Builder Pattern ====================

    public static class Builder {
        private Long id;
        private Task task;
        private User user;
        private LocalDate updateDate;
        private String comment;
        private Integer hoursSpent;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder task(Task task) {
            this.task = task;
            return this;
        }

        public Builder user(User user) {
            this.user = user;
            return this;
        }

        public Builder updateDate(LocalDate updateDate) {
            this.updateDate = updateDate;
            return this;
        }

        public Builder comment(String comment) {
            this.comment = comment;
            return this;
        }

        public Builder hoursSpent(Integer hoursSpent) {
            this.hoursSpent = hoursSpent;
            return this;
        }

        public TaskUpdate build() {
            TaskUpdate update = new TaskUpdate();
            update.id = this.id;
            update.task = this.task;
            update.user = this.user;
            update.updateDate = this.updateDate;
            update.comment = this.comment;
            update.hoursSpent = this.hoursSpent;
            return update;
        }
    }

    // Static factory method to start the builder
    public static Builder builder() {
        return new Builder();
    }
}