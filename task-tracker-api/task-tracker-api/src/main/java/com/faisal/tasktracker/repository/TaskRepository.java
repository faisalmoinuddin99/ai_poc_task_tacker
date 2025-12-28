package com.faisal.tasktracker.repository;

import com.faisal.tasktracker.model.Task;
import com.faisal.tasktracker.model.TaskStatus;
import com.faisal.tasktracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByAssignedTo(User user);

    List<Task> findByAssignedToAndStatus(User user, TaskStatus status);

    List<Task> findByTargetDate(LocalDate date);
}