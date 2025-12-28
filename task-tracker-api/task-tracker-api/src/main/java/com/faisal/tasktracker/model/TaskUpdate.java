package com.faisal.tasktracker.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(
        name = "task_updates",
        indexes = {
                @Index(name = "idx_task_date", columnList = "task_id, updateDate"),
                @Index(name = "idx_user_date", columnList = "user_id, updateDate")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

}
