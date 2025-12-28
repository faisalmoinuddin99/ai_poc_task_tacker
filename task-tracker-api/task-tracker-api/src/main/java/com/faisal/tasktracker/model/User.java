package com.faisal.tasktracker.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;

    private Integer dailyCapacityHours;

    private Integer complianceScore;

    private LocalDateTime createdAt;

    // ==================== Constructors ====================

    /** Default no-arg constructor required by JPA */
    public User() {
    }

    /** Full constructor (replaces @AllArgsConstructor) */
    public User(Long id, String name, String email, Role role,
                Integer dailyCapacityHours, Integer complianceScore, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.dailyCapacityHours = dailyCapacityHours;
        this.complianceScore = complianceScore;
        this.createdAt = createdAt;
    }

    // ==================== Getters ====================

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }

    public Integer getDailyCapacityHours() {
        return dailyCapacityHours;
    }

    public Integer getComplianceScore() {
        return complianceScore;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // ==================== Setters ====================

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setDailyCapacityHours(Integer dailyCapacityHours) {
        this.dailyCapacityHours = dailyCapacityHours;
    }

    public void setComplianceScore(Integer complianceScore) {
        this.complianceScore = complianceScore;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // ==================== JPA Callback ====================

    @PrePersist
    void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.complianceScore == null) {
            this.complianceScore = 100;
        }
    }

    // ==================== equals, hashCode, toString ====================

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", role=" + role +
                ", dailyCapacityHours=" + dailyCapacityHours +
                ", complianceScore=" + complianceScore +
                ", createdAt=" + createdAt +
                '}';
    }

    // ==================== Manual Builder Pattern ====================

    public static class Builder {
        private Long id;
        private String name;
        private String email;
        private Role role;
        private Integer dailyCapacityHours;
        private Integer complianceScore;
        private LocalDateTime createdAt;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder role(Role role) {
            this.role = role;
            return this;
        }

        public Builder dailyCapacityHours(Integer dailyCapacityHours) {
            this.dailyCapacityHours = dailyCapacityHours;
            return this;
        }

        public Builder complianceScore(Integer complianceScore) {
            this.complianceScore = complianceScore;
            return this;
        }

        public Builder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public User build() {
            User user = new User();
            user.id = this.id;
            user.name = this.name;
            user.email = this.email;
            user.role = this.role;
            user.dailyCapacityHours = this.dailyCapacityHours;
            user.complianceScore = this.complianceScore;
            user.createdAt = this.createdAt;
            return user;
        }
    }

    // Static factory method to start the builder
    public static Builder builder() {
        return new Builder();
    }
}