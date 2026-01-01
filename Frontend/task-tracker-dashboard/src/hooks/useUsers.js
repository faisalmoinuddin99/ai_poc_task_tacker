// src/hooks/useUsers.js
import { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:8082/api/tasks/user';

export const useUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Rahul', email: 'rahul@company.com', role: 'MEMBER', dailyCapacityHours: 8, complianceScore: 100 },
    { id: 2, name: 'Priya Singh', email: 'priya@company.com', role: 'MEMBER', dailyCapacityHours: 7, complianceScore: 100 },
    { id: 3, name: 'Amit Sharma', email: 'amit@company.com', role: 'MANAGER', dailyCapacityHours: 6, complianceScore: 100 },
    { id: 4, name: 'Test User', email: 'test@company.com', role: 'MEMBER', dailyCapacityHours: 8, complianceScore: 100 },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaskCounts = async () => {
      setLoading(true);
      const updatedUsers = [...users];

      await Promise.all(
        updatedUsers.map(async (user) => {
          try {
            const res = await fetch(`${API_BASE}/${user.email}`);
            if (res.ok) {
              const tasks = await res.json();
              user.taskCount = tasks.length; // Add real task count
            } else {
              user.taskCount = 0;
            }
          } catch (err) {
            console.error(`Failed to fetch tasks for ${user.email}`, err);
            user.taskCount = 0;
          }
        })
      );

      setUsers(updatedUsers);
      setLoading(false);
    };

    fetchTaskCounts();
  }, []);

  return { users, loading };
};