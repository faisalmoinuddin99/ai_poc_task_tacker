package com.faisal.tasktracker.repository;

import com.faisal.tasktracker.model.TaskUpdate;
import com.faisal.tasktracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TaskUpdateRepository extends JpaRepository<TaskUpdate, Long> {
    Optional<TaskUpdate> findByTaskIdAndUserIdAndUpdateDate(
            Long taskId,
            Long userId,
            LocalDate updateDate
    );

    List<TaskUpdate> findByUserAndUpdateDate(User user, LocalDate updateDate);
}
