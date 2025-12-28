package com.faisal.tasktracker.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    @Column(nullable = false)
    private String name ;

    @Column(nullable = false, unique = true)
    private String email ;

    @Enumerated(EnumType.STRING)
    private Role role ;

    private Integer dailyCapacityHours ;
    private Integer complianceScore ;
    private LocalDateTime createdAt ;

    @PrePersist
    void onCreate(){
        this.createdAt = LocalDateTime.now() ;
        if (complianceScore == null) complianceScore = 100 ;
    }
}
