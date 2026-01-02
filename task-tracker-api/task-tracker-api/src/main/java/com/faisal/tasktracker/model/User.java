package com.faisal.tasktracker.model;

import jakarta.persistence.*;
import java.time.LocalDate;
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

    @Column(name = "daily_capacity_hours")
    private Integer dailyCapacityHours;

    @Column(name = "compliance_score")
    private Integer complianceScore;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Compliance tracking fields
    @Column(name = "compliance_streak")
    private Integer complianceStreak = 0;

    @Column(name = "longest_compliance_streak")
    private Integer longestComplianceStreak = 0;

    @Column(name = "non_compliant_days_count")
    private Integer nonCompliantDaysCount = 0;

    @Column(name = "last_compliant_date")
    private LocalDate lastCompliantDate;

    // ==================== JPA Callbacks ====================

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
        if (this.complianceScore == null) {
            this.complianceScore = 100;
        }
        if (this.dailyCapacityHours == null) {
            this.dailyCapacityHours = 8;
        }
        if (this.role == null) {
            this.role = Role.DEVELOPER; // assuming you have a default
        }
        // Initialize defaults if null
        if (this.complianceStreak == null) this.complianceStreak = 0;
        if (this.longestComplianceStreak == null) this.longestComplianceStreak = 0;
        if (this.nonCompliantDaysCount == null) this.nonCompliantDaysCount = 0;
    }

    // ==================== Constructors ====================

    /** Required by JPA */
    public User() {
    }

    /** Convenient constructor for basic user creation */
    public User(String name, String email, Role role) {
        this.name = name;
        this.email = email;
        this.role = role;
    }

    /** Full constructor for testing or manual instantiation */
    public User(String name, String email, Role role, Integer dailyCapacityHours,
                Integer complianceScore, Integer complianceStreak,
                Integer longestComplianceStreak, Integer nonCompliantDaysCount,
                LocalDate lastCompliantDate) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.dailyCapacityHours = dailyCapacityHours;
        this.complianceScore = complianceScore;
        this.complianceStreak = complianceStreak;
        this.longestComplianceStreak = longestComplianceStreak;
        this.nonCompliantDaysCount = nonCompliantDaysCount;
        this.lastCompliantDate = lastCompliantDate;
    }

    // ==================== Getters and Setters ====================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Integer getDailyCapacityHours() {
        return dailyCapacityHours;
    }

    public void setDailyCapacityHours(Integer dailyCapacityHours) {
        this.dailyCapacityHours = dailyCapacityHours;
    }

    public Integer getComplianceScore() {
        return complianceScore;
    }

    public void setComplianceScore(Integer complianceScore) {
        this.complianceScore = complianceScore;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getComplianceStreak() {
        return complianceStreak;
    }

    public void setComplianceStreak(Integer complianceStreak) {
        this.complianceStreak = complianceStreak;
    }

    public Integer getLongestComplianceStreak() {
        return longestComplianceStreak;
    }

    public void setLongestComplianceStreak(Integer longestComplianceStreak) {
        this.longestComplianceStreak = longestComplianceStreak;
    }

    public Integer getNonCompliantDaysCount() {
        return nonCompliantDaysCount;
    }

    public void setNonCompliantDaysCount(Integer nonCompliantDaysCount) {
        this.nonCompliantDaysCount = nonCompliantDaysCount;
    }

    public LocalDate getLastCompliantDate() {
        return lastCompliantDate;
    }

    public void setLastCompliantDate(LocalDate lastCompliantDate) {
        this.lastCompliantDate = lastCompliantDate;
    }

    // ==================== equals, hashCode, toString ====================

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User user)) return false;
        return Objects.equals(id, user.id) &&
                Objects.equals(email, user.email) && // email is unique
                Objects.equals(name, user.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, name);
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
                ", complianceStreak=" + complianceStreak +
                ", longestComplianceStreak=" + longestComplianceStreak +
                ", nonCompliantDaysCount=" + nonCompliantDaysCount +
                ", lastCompliantDate=" + lastCompliantDate +
                ", createdAt=" + createdAt +
                '}';
    }

    // ==================== Builder Pattern ====================

    public static class Builder {
        private Long id;
        private String name;
        private String email;
        private Role role;
        private Integer dailyCapacityHours;
        private Integer complianceScore;
        private LocalDateTime createdAt;
        private Integer complianceStreak = 0;
        private Integer longestComplianceStreak = 0;
        private Integer nonCompliantDaysCount = 0;
        private LocalDate lastCompliantDate;

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

        public Builder complianceStreak(Integer complianceStreak) {
            this.complianceStreak = complianceStreak;
            return this;
        }

        public Builder longestComplianceStreak(Integer longestComplianceStreak) {
            this.longestComplianceStreak = longestComplianceStreak;
            return this;
        }

        public Builder nonCompliantDaysCount(Integer nonCompliantDaysCount) {
            this.nonCompliantDaysCount = nonCompliantDaysCount;
            return this;
        }

        public Builder lastCompliantDate(LocalDate lastCompliantDate) {
            this.lastCompliantDate = lastCompliantDate;
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
            user.complianceStreak = this.complianceStreak;
            user.longestComplianceStreak = this.longestComplianceStreak;
            user.nonCompliantDaysCount = this.nonCompliantDaysCount;
            user.lastCompliantDate = this.lastCompliantDate;
            return user;
        }
    }

    public static Builder builder() {
        return new Builder();
    }
}