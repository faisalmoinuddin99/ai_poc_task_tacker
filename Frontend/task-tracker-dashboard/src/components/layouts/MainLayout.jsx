// src/components/layout/MainLayout.jsx

import { Sidebar } from './Sidebar';
import { HeaderTabs } from './HeaderTabs';

export const MainLayout = ({
  children,
  selectedTab,
  setSelectedTab,
  currentUser,
  tasks = [],           // Optional prop with default empty array
  error,
  onRetry,
}) => {
  // Helper to get initials from name
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .trim()
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-8">
        {/* Error Banner */}
        {error && (
          <div className="mb-6">
            <div className="bg-red-900 bg-opacity-50 border border-red-500 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold">Failed to load data</p>
                  <p className="text-xs text-red-200">{error}</p>
                </div>
              </div>
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Tabs Navigation */}
        <HeaderTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {/* Dynamic Tab Content */}
        <div className="mt-6">
          {children}
        </div>
      </div>

      {/* Right Sidebar - User Profile */}
      <div className="w-96 bg-orange-500 p-8 flex flex-col">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            {currentUser?.name || 'User'}
          </h2>
          <p className="text-sm opacity-90">{currentUser?.role || 'N/A'}</p>
          <p className="text-sm opacity-90 mt-1">{currentUser?.email || 'N/A'}</p>
        </div>

        {/* Avatar Placeholder with Default Avatar */}
        <div className="flex-1 bg-orange-400 rounded-3xl relative overflow-hidden mb-8 flex items-center justify-center">
          <div className="relative w-48 h-48">
            {/* Default Avatar Circle with Initials or Icon */}
            <div className="w-full h-full bg-orange-600 rounded-full flex items-center justify-center text-6xl font-bold text-orange-200 shadow-2xl">
              {currentUser?.name ? (
                getInitials(currentUser.name)
              ) : (
                // Fallback SVG user icon when no name
                <svg className="w-24 h-24 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Capacity Stats */}
        <div className="bg-black rounded-3xl p-6">
          <h3 className="text-lg font-semibold mb-4">Today's Capacity</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Daily Capacity</span>
              <span className="font-bold">{currentUser?.dailyCapacityHours || 0} hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Compliance Score</span>
              <span className="font-bold">{currentUser?.complianceScore || 0}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tasks Assigned</span>
              <span className="font-bold">{tasks.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};