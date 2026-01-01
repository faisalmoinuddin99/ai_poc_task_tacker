export const calculateTeamStats = (users) => {
  if (!users?.length) return { avgComplianceScore: 0, totalCapacity: 0, teamUtilization: 0 };

  const avgComplianceScore = Math.round(
    users.reduce((sum, u) => sum + (u.complianceScore || 0), 0) / users.length
  );
  const totalCapacity = users.reduce((sum, u) => sum + (u.dailyCapacityHours || 0), 0);

  return { avgComplianceScore, totalCapacity, teamUtilization: 88 };
};

export const calculateTaskStats = (tasks) => {
  if (!tasks?.length) return { totalEstimated: 0, totalSpent: 0, percentComplete: 0 };

  const totalEstimated = tasks.reduce((sum, t) => sum + (t.estimatedHours || 0), 0);
  const totalSpent = Math.floor(totalEstimated * 0.6); // mock
  const percentComplete = totalEstimated > 0 ? Math.round((totalSpent / totalEstimated) * 100) : 0;

  return { totalEstimated, totalSpent, percentComplete };
};