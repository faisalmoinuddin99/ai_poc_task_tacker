// src/components/dashboard/TasksTab.jsx
import { useState } from 'react';
import { Clock } from '../icons/Clock';
import { Target } from '../icons/Target';
import { Plus } from '../icons/Plus';
import { CreateTaskModal } from './CreateTaskModal';

const statusColors = {
  TODO: 'bg-gray-600 text-gray-200',
  IN_PROGRESS: 'bg-blue-600 text-blue-100',
  DONE: 'bg-green-600 text-green-100',
  BLOCKED: 'bg-red-600 text-red-100',
};

const statusText = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
  BLOCKED: 'Blocked',
};

export const TasksTab = ({ tasks = [], currentUser, loadingTasks = false, onTasksUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskCreated = (newTask) => {
    onTasksUpdate([newTask, ...tasks]); // Prepend new task
  };

  if (loadingTasks) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <p className="text-gray-400 mt-1">
            {currentUser?.name || 'User'}'s active tasks • {tasks.length} total
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-2xl font-semibold transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="bg-gray-800 rounded-3xl p-12 text-center">
          <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Target className="w-12 h-12 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
          <p className="text-gray-400">All caught up! Create a new task to get started.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-800 rounded-3xl p-6 hover:bg-gray-750 transition-all cursor-pointer border border-transparent hover:border-orange-500"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold line-clamp-2">{task.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.status] || 'bg-gray-600 text-gray-200'}`}>
                  {statusText[task.status] || task.status}
                </span>
              </div>

              {task.description && (
                <p className="text-gray-400 text-sm mb-5 line-clamp-3">{task.description}</p>
              )}

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-400">
                    Est: <span className="font-medium text-white">{task.estimatedHours} hours</span>
                  </span>
                </div>

                {task.targetDate && (
                  <div className="flex items-center gap-3 text-sm">
                    <Target className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-400">
                      Due: <span className="font-medium text-white">
                        {new Date(task.targetDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>0%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full transition-all" style={{ width: '0%' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
};