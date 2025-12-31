//package com.faisal.tasktracker.model;
//
//import jakarta.persistence.*;
//import java.time.LocalDate;
//import java.util.Objects;
//
//@Entity
//@Table(
//        name = "compliance_logs",
//        indexes = {
//                @Index(name = "idx_user_date", columnList = "user_id, date")
//        }
//)
//public class ComplianceLog {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id", nullable = false)
//    private User user;
//
//    private LocalDate date;
//
//    private Boolean compliant;
//
//    private String reason;
//
//    // ==================== Constructors ====================
//
//    /** Default no-arg constructor required by JPA */
//    public ComplianceLog() {
//    }
//
//    /** Full constructor (replaces @AllArgsConstructor) */
//    public ComplianceLog(Long id, User user, LocalDate date, Boolean compliant, String reason) {
//        this.id = id;
//        this.user = user;
//        this.date = date;
//        this.compliant = compliant;
//        this.reason = reason;
//    }
//
//    // ==================== Getters ====================
//
//    public Long getId() {
//        return id;
//    }
//
//    public User getUser() {
//        return user;
//    }
//
//    public LocalDate getDate() {
//        return date;
//    }
//
//    public Boolean getCompliant() {
//        return compliant;
//    }
//
//    public String getReason() {
//        return reason;
//    }
//
//    // ==================== Setters ====================
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
//
//    public void setDate(LocalDate date) {
//        this.date = date;
//    }
//
//    public void setCompliant(Boolean compliant) {
//        this.compliant = compliant;
//    }
//
//    public void setReason(String reason) {
//        this.reason = reason;
//    }
//
//    // ==================== equals, hashCode, toString ====================
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        ComplianceLog that = (ComplianceLog) o;
//        return Objects.equals(id, that.id);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(id);
//    }
//
//    @Override
//    public String toString() {
//        return "ComplianceLog{" +
//                "id=" + id +
//                ", user=" + (user != null ? user.getId() : null) +
//                ", date=" + date +
//                ", compliant=" + compliant +
//                ", reason='" + reason + '\'' +
//                '}';
//    }
//
//    // ==================== Manual Builder Pattern ====================
//
//    public static class Builder {
//        private Long id;
//        private User user;
//        private LocalDate date;
//        private Boolean compliant;
//        private String reason;
//
//        public Builder id(Long id) {
//            this.id = id;
//            return this;
//        }
//
//        public Builder user(User user) {
//            this.user = user;
//            return this;
//        }
//
//        public Builder date(LocalDate date) {
//            this.date = date;
//            return this;
//        }
//
//        public Builder compliant(Boolean compliant) {
//            this.compliant = compliant;
//            return this;
//        }
//
//        public Builder reason(String reason) {
//            this.reason = reason;
//            return this;
//        }
//
//        public ComplianceLog build() {
//            ComplianceLog log = new ComplianceLog();
//            log.id = this.id;
//            log.user = this.user;
//            log.date = this.date;
//            log.compliant = this.compliant;
//            log.reason = this.reason;
//            return log;
//        }
//    }
//
//    // Static factory method to start the builder
//    public static Builder builder() {
//        return new Builder();
//    }
//}

package com.faisal.tasktracker.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "compliance_logs")
public class ComplianceLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private boolean compliant;

    private String reason;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // getters & setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public boolean isCompliant() {
        return compliant;
    }

    public void setCompliant(boolean compliant) {
        this.compliant = compliant;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
