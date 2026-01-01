// src/components/dashboard/OverviewTab.jsx

import { useState } from 'react';
import { Plus } from '../icons/Plus';
import { Clock } from '../icons/Clock';
import { Target } from '../icons/Target';
import { TrendingUp } from '../icons/TrendingUp';
import { UserCheck } from '../icons/UserCheck';
import { CreateTaskModal } from './CreateTaskModal';

export const OverviewTab = ({
  currentUser,
  tasks,
  setTasks,
  users,
  teamStats,
  taskStats,
  onUserSelect,
  loadingTasks = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskCreated = (newTask) => {
    setTasks([newTask, ...tasks]); // Prepend normalized task
  };

  // Mock data - keep exactly as original
  const weeklyHoursData = [7, 8, 6, 9, 5, 0, 0];
  const teamUtilizationData = [65, 72, 78, 85, 82, 90, 88];
  const maxHours = Math.max(...weeklyHoursData, 1);

  return (
    <>
      {/* Welcome Banner */}
      <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-3xl p-6 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            Hello, {currentUser?.name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-orange-100">
            You have {tasks.length} active tasks • Team capacity: {teamStats.teamUtilization}% utilized
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center hover:bg-gray-900 transition"
          aria-label="Create new task"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Weekly Hours */}
        <div className="bg-gray-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">Hours This Week</h3>
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
          <div className="flex items-end space-x-1 mb-3 h-24">
            {weeklyHoursData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end">
                <div
                  className={`rounded-t ${i === 3 ? 'bg-white' : 'bg-gray-600'}`}
                  style={{ height: `${(val / maxHours) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <p className="text-2xl font-bold">
            35 <span className="text-sm text-gray-400 font-normal">hrs</span>
          </p>
        </div>

        {/* Team Compliance */}
        <div className="bg-gray-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">Team Compliance</h3>
            <Target className="w-5 h-5 text-blue-500" />
          </div>
          <div className="relative w-32 h-32 mx-auto mb-2">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="56" fill="none" stroke="#374151" strokeWidth="12" />
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="#f97316"
                strokeWidth="12"
                strokeDasharray="351.86"
                strokeDashoffset={351.86 - (351.86 * teamStats.avgComplianceScore) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold">{teamStats.avgComplianceScore}%</p>
              <p className="text-xs text-gray-400">Score</p>
            </div>
          </div>
        </div>

        {/* Priority Task */}
        <div className="bg-gray-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-200 font-medium">Priority Task</h3>
          </div>
          {loadingTasks ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : tasks.length > 0 ? (
            <>
              <h2 className="text-xl font-bold mb-4 line-clamp-2">{tasks[0].title}</h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">
                    {taskStats.totalSpent}/{taskStats.totalEstimated}
                    <span className="text-sm text-gray-400"> hrs</span>
                  </p>
                  <p className="text-xs text-gray-400">{taskStats.percentComplete}% complete</p>
                </div>
                <button className="w-12 h-12 bg-gray-700 rounded-2xl flex items-center justify-center hover:bg-gray-600 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-400">No tasks available</p>
          )}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Team Members */}
        <div className="bg-gray-800 rounded-3xl p-6 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <UserCheck className="w-5 h-5 text-white mr-2" />
            <h3 className="font-medium text-gray-400">Team Members</h3>
          </div>
          <div className="space-y-3 overflow-y-auto flex-1 pr-2" style={{ maxHeight: '280px' }}>
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => onUserSelect(user)}
                className={`w-full text-left text-sm flex justify-between items-center p-3 rounded-xl transition-all ${
                  currentUser?.id === user.id
                    ? 'bg-orange-500 bg-opacity-20 border border-orange-500'
                    : 'hover:bg-gray-700'
                }`}
              >
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-gray-400 text-xs">{user.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-green-400">{user.complianceScore}%</p>
                  <p className="text-xs text-gray-500">{user.dailyCapacityHours}h</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bandwidth Trend */}
        <div className="col-span-2 bg-gray-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-orange-500 mr-2" />
              <h3 className="font-medium">Team Bandwidth Trend</h3>
              <span className="ml-3 text-sm text-green-400">+12% · Improving</span>
            </div>
            <p className="text-3xl font-bold">
              88<span className="text-sm text-gray-400">%</span>
            </p>
          </div>
          <div className="relative h-32">
            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`M 0 ${100 - teamUtilizationData[0]} ${teamUtilizationData.map(
                  (d, i) => `L ${(i * 400) / (teamUtilizationData.length - 1)} ${100 - d}`
                ).join(' ')} L 400 100 L 0 100 Z`}
                fill="url(#trendGradient)"
              />
              <path
                d={`M 0 ${100 - teamUtilizationData[0]} ${teamUtilizationData.map(
                  (d, i) => `L ${(i * 400) / (teamUtilizationData.length - 1)} ${100 - d}`
                ).join(' ')}`}
                fill="none"
                stroke="#f97316"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <button className="px-3 py-1 bg-orange-500 rounded-full text-white">1w</button>
            <button className="px-3 py-1 hover:bg-gray-700 rounded-full">1m</button>
            <button className="px-3 py-1 hover:bg-gray-700 rounded-full">3m</button>
            <button className="px-3 py-1 hover:bg-gray-700 rounded-full">1y</button>
          </div>
        </div>
      </div>

      {/* Shared Create Task Modal */}
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={handleTaskCreated}
      />
    </>
  );
};