// src/services/api.js

export const API_BASE_URL = 'http://localhost:8082/api';
export const AI_API_URL = 'http://localhost:8082/api/ai/ask';

// ==================== REAL API FUNCTIONS ====================

/**
 * Fetch all team members (users)
 */
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`); // Adjust endpoint if different
    // If you don't have a /users endpoint yet, keep mock or create one

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }

    const users = await response.json();

    // Map to expected frontend shape
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role || 'MEMBER',
      dailyCapacityHours: user.dailyCapacityHours || 8,
      complianceScore: user.complianceScore ?? 100,
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    // Fallback: return empty array or throw
    return [];
  }
};

/**
 * Fetch tasks for a specific user by email
 * @param {string} email - User's email
 */
export const fetchTasksForUser = async (email) => {
  if (!email) {
    console.warn('fetchTasksForUser: No email provided');
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/tasks/user/${encodeURIComponent(email)}`);

    if (!response.ok) {
      if (response.status === 404) {
        return []; // No tasks → empty array is fine
      }
      throw new Error(`Failed to fetch tasks: ${response.status}`);
    }

    const rawTasks = await response.json();

    // Normalize: flatten structure to match what TasksTab & OverviewTab expect
    return rawTasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description || '',
      status: task.status || 'IN_PROGRESS',
      estimatedHours: task.estimatedHours,
      targetDate: task.targetDate,
      // Optional: if you want assignee info later
      // assignedUserName: task.assignedTo?.name,
    }));
  } catch (error) {
    console.error(`Error fetching tasks for ${email}:`, error);
    return [];
  }
};

/**
 * Ask AI - already working perfectly
 */
export const askAI = async (message) => {
  if (!message?.trim()) {
    throw new Error('Message is required');
  }

  try {
    const response = await fetch(AI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: message.trim(),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(`AI request failed: ${response.status} ${errorText}`.trim());
    }

    const text = await response.text();
    return text.trim();
  } catch (err) {
    console.error('askAI error:', err);
    throw err;
  }
};