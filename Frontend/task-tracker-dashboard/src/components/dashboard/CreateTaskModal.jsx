// src/components/dashboard/CreateTaskModal.jsx
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  estimatedHours: z.coerce.number().min(1, 'At least 1 hour'),
  targetDate: z.string().min(1, 'Target date is required'),
  assignedUserEmail: z.string().email('Invalid email'),
});

export const CreateTaskModal = ({ isOpen, onClose, onTaskCreated }) => {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(taskSchema) });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:8082/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title.trim(),
          description: data.description?.trim() || '',
          status: 'IN_PROGRESS',
          estimatedHours: Number(data.estimatedHours),
          targetDate: data.targetDate,
          assignedUserEmail: data.assignedUserEmail.trim(),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to create task');
      }

      const rawTask = await res.json();

      // CRITICAL: Normalize to match existing task shape
      const normalizedTask = {
        id: rawTask.id,
        title: rawTask.title,
        description: rawTask.description || '',
        status: rawTask.status || 'IN_PROGRESS',
        estimatedHours: rawTask.estimatedHours,
        targetDate: rawTask.targetDate,
        // Optional: if you want assignee name later
        // assignedUserName: rawTask.assignedTo?.name,
      };

      toast.success('Task created successfully!');
      onTaskCreated(normalizedTask); // Pass clean object
      onClose();
      reset();
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
      <div className="bg-gray-800 rounded-3xl p-8 w-full max-w-2xl max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Create New Task</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              {...register('title')}
              className="w-full px-4 py-3 bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g. Integrate payment API"
              autoFocus
            />
            {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-4 py-3 bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Estimated Hours *</label>
              <input
                type="number"
                {...register('estimatedHours')}
                min="1"
                className="w-full px-4 py-3 bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.estimatedHours && <p className="text-red-400 text-sm mt-1">{errors.estimatedHours.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Target Date *</label>
              <input
                type="date"
                {...register('targetDate')}
                min="2026-01-01"
                className="w-full px-4 py-3 bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.targetDate && <p className="text-red-400 text-sm mt-1">{errors.targetDate.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Assignee Email *</label>
            <input
              type="email"
              {...register('assignedUserEmail')}
              className="w-full px-4 py-3 bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="test@company.com"
            />
            {errors.assignedUserEmail && <p className="text-red-400 text-sm mt-1">{errors.assignedUserEmail.message}</p>}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => { onClose(); reset(); }}
              disabled={submitting}
              className="px-6 py-3 rounded-2xl hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-2xl font-semibold disabled:opacity-50 transition"
            >
              {submitting ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};