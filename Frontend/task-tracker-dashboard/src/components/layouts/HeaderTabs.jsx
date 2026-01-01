export const HeaderTabs = ({ selectedTab, setSelectedTab }) => (
  <div className="flex items-center justify-between mb-8">
    <div className="flex space-x-8">
      {['overview', 'tasks', 'ai', 'ai2'].map(tab => (
        <button
          key={tab}
          onClick={() => setSelectedTab(tab)}
          className={`text-lg font-semibold pb-2 capitalize ${
            selectedTab === tab
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-400'
          }`}
        >
          {tab === 'ai' ? 'AI Assistant v1' : tab === 'overview' ? 'Overview' : tab === 'ai2' ? "Ai Assistance v2" :'My Tasks'}
        </button>
      ))}
    </div>
    <div className="flex items-center space-x-4">
      {/* Search & Notifications */}
    </div>
  </div>
);