// src/services/api.js

export const API_BASE_URL = 'http://localhost:8082/api';

// ==================== AI ENDPOINTS ====================

// v1 — Old plain-text AI endpoint
export const AI_V1_URL = `${API_BASE_URL}/ai/ask`;

// v2 — New structured AI endpoint (the one we improved)
export const AI_V2_URL = `${API_BASE_URL}/v2/ai/ask`;

// ==================== REAL API FUNCTIONS ====================

/**
 * Fetch all team members (users)
 */
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }

    const users = await response.json();

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
    return [];
  }
};

/**
 * Fetch tasks for a specific user by email
 */
export const fetchTasksForUser = async (email) => {
  if (!email) {
    console.warn('fetchTasksForUser: No email provided');
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/tasks/user/${encodeURIComponent(email)}`);

    if (!response.ok) {
      if (response.status === 404) return [];
      throw new Error(`Failed to fetch tasks: ${response.status}`);
    }

    const rawTasks = await response.json();

    return rawTasks.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description || '',
      status: task.status || 'IN_PROGRESS',
      estimatedHours: task.estimatedHours,
      targetDate: task.targetDate,
    }));
  } catch (error) {
    console.error(`Error fetching tasks for ${email}:`, error);
    return [];
  }
};

/**
 * Ask AI v1 — Plain text in/out (your original working version)
 */
export const askAIV1 = async (message) => {
  if (!message?.trim()) {
    throw new Error('Message is required');
  }

  try {
    const response = await fetch(AI_V1_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: message.trim(),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(`AI v1 request failed: ${response.status} ${errorText}`.trim());
    }

    const text = await response.text();
    return text.trim();
  } catch (err) {
    console.error('askAIV1 error:', err);
    throw err;
  }
};

export const askAIV2 = async (message) => {
  if (!message?.trim()) {
    throw new Error('Message is required');
  }

  try {
    const response = await fetch('http://localhost:8082/api/v2/ai/ask', {  // ← Correct path
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // ← JSON, not text/plain
      },
      body: JSON.stringify({ message: message.trim() }),  // ← Proper JSON body
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(`AI request failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();  // ← Parse JSON response
    return data.answer || 'No response from AI.';
  } catch (err) {
    console.error('askAIV2 error:', err);
    throw err;
  }
};

// Make askAI use the working v2 version
export const askAI = askAIV2;  // ← This is the only line you need to change/add