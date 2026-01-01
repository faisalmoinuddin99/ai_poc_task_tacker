import React, { useState, useEffect } from 'react';

// Custom SVG Icons
const Home = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const Grid = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
  </svg>
);

const Users = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const Settings = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const BarChart3 = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const Plus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const MessageCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const Clock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Target = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={2} />
    <circle cx="12" cy="12" r="6" strokeWidth={2} />
    <circle cx="12" cy="12" r="2" strokeWidth={2} />
  </svg>
);

const TrendingUp = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const UserCheck = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l2 2 4-4" />
  </svg>
);

const AlertCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const API_BASE_URL = 'http://localhost:8082/api';

const TaskTrackerDashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [retryCount, setRetryCount] = useState(0);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const MAX_RETRIES = 3;

  // Mock tasks data by user email
  const mockTasksByUser = {
    "rahul@company.com": [
      {
        "id": 1,
        "title": "Integrate payment API",
        "description": "Stripe integration",
        "status": "IN_PROGRESS",
        "estimatedHours": 6,
        "targetDate": "2025-01-15",
        "assignedTo": {
          "id": 1,
          "name": "Rahul",
          "email": "rahul@company.com"
        },
        "createdAt": "2025-12-28T19:10:56.202095"
      },
      {
        "id": 3,
        "title": "Integrate payment API",
        "description": "Stripe integration",
        "status": "IN_PROGRESS",
        "estimatedHours": 6,
        "targetDate": "2025-01-15",
        "assignedTo": {
          "id": 1,
          "name": "Rahul",
          "email": "rahul@company.com"
        },
        "createdAt": "2025-12-28T19:37:04.564973"
      },
      {
        "id": 4,
        "title": "Integrate Stripe Payment API",
        "description": "Complete Stripe checkout integration with webhooks",
        "status": "IN_PROGRESS",
        "estimatedHours": 12,
        "targetDate": "2025-01-15",
        "assignedTo": {
          "id": 1,
          "name": "Rahul",
          "email": "rahul@company.com"
        },
        "createdAt": "2025-12-28T19:46:44.219879"
      }
    ],
    "priya@company.com": [
      {
        "id": 5,
        "title": "Fix login bug",
        "description": "OAuth refresh token not working",
        "status": "TODO",
        "estimatedHours": 4,
        "targetDate": "2025-01-05",
        "assignedTo": {
          "id": 2,
          "name": "Priya Singh",
          "email": "priya@company.com"
        },
        "createdAt": "2025-12-28T19:47:02.228733"
      }
    ],
    "amit@company.com": [],
    "test@company.com": []
  };

  const fetchUserTasks = async (userEmail) => {
    setLoadingTasks(true);
    try {
      // FOR TESTING: Use mock data
      await new Promise(resolve => setTimeout(resolve, 300));
      const userTasks = mockTasksByUser[userEmail] || [];
      setTasks(userTasks);
      setLoadingTasks(false);

      /* PRODUCTION: Uncomment for real API
      const tasksResponse = await fetch(`${API_BASE_URL}/tasks/user/${userEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!tasksResponse.ok) {
        throw new Error(`Failed to fetch tasks: ${tasksResponse.status}`);
      }

      const tasksData = await tasksResponse.json();
      setTasks(Array.isArray(tasksData) ? tasksData : []);
      setLoadingTasks(false);
      */
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setTasks([]);
      setLoadingTasks(false);
    }
  };

  const handleUserClick = async (user) => {
    setCurrentUser(user);
    await fetchUserTasks(user.email);
  };

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMessage = { role: 'user', content: aiInput.trim() };
    setAiMessages(prev => [...prev, userMessage]);
    setAiInput('');
    setAiLoading(true);

    try {
      const response = await fetch('https://bandwidth-tracker-exbrb2czdygagmb6.centralindia-01.azurewebsites.net/api/ai/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: aiInput.trim(),
      });

      if (!response.ok) {
        throw new Error(`AI request failed: ${response.status}`);
      }

      const aiResponse = await response.text();
      const assistantMessage = { role: 'assistant', content: aiResponse };
      setAiMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('AI error:', err);
      const errorMessage = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error processing your request. Please try again.' 
      };
      setAiMessages(prev => [...prev, errorMessage]);
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [retryCount]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // FOR TESTING: Use mock data instead of API call
      // Comment this block and uncomment the fetch below for production
      const mockUsersData = [
        {
          "complianceScore": 100,
          "complianceStreak": null,
          "createdAt": "2025-12-28T19:09:32.729233",
          "dailyCapacityHours": 8,
          "email": "rahul@company.com",
          "id": 1,
          "lastCompliantDate": null,
          "longestComplianceStreak": null,
          "name": "Rahul",
          "nonCompliantDaysCount": null,
          "role": "MEMBER"
        },
        {
          "complianceScore": 100,
          "complianceStreak": null,
          "createdAt": "2025-12-28T19:46:17.878694",
          "dailyCapacityHours": 7,
          "email": "priya@company.com",
          "id": 2,
          "lastCompliantDate": null,
          "longestComplianceStreak": null,
          "name": "Priya Singh",
          "nonCompliantDaysCount": null,
          "role": "MEMBER"
        },
        {
          "complianceScore": 100,
          "complianceStreak": null,
          "createdAt": "2025-12-28T19:46:28.436032",
          "dailyCapacityHours": 6,
          "email": "amit@company.com",
          "id": 3,
          "lastCompliantDate": null,
          "longestComplianceStreak": null,
          "name": "Amit Sharma",
          "nonCompliantDaysCount": null,
          "role": "MANAGER"
        },
        {
          "complianceScore": 100,
          "complianceStreak": null,
          "createdAt": "2025-12-28T20:01:07.445912",
          "dailyCapacityHours": 8,
          "email": "test@company.com",
          "id": 4,
          "lastCompliantDate": null,
          "longestComplianceStreak": null,
          "name": "Test User",
          "nonCompliantDaysCount": null,
          "role": "MEMBER"
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setUsers(mockUsersData);

      // Set first user as current user
      const user = mockUsersData.find(u => u.email === 'rahul@company.com') || mockUsersData[0];
      
      if (user) {
        setCurrentUser(user);
        // Fetch tasks for the initial user
        await fetchUserTasks(user.email);
      }

      setLoading(false);

      /* PRODUCTION: Uncomment this for real API calls
      const usersResponse = await fetch(`${API_BASE_URL}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!usersResponse.ok) {
        throw new Error(`Failed to fetch users: ${usersResponse.status} ${usersResponse.statusText}`);
      }

      const usersData = await usersResponse.json();

      if (!Array.isArray(usersData)) {
        throw new Error('Invalid users data format');
      }

      setUsers(usersData);

      const user = usersData.find(u => u.email === 'rahul@company.com') || usersData[0];
      
      if (user) {
        setCurrentUser(user);
      } else {
        throw new Error('No users found');
      }

      setTasks([
        { id: 1, title: "Stripe Checkout Integration", status: "IN_PROGRESS", estimatedHours: 10, spentHours: 6, targetDate: "2025-01-10" },
        { id: 2, title: "Compliance Documentation", status: "TODO", estimatedHours: 5, spentHours: 0, targetDate: "2025-01-15" },
        { id: 3, title: "API Rate Limiting", status: "IN_PROGRESS", estimatedHours: 8, spentHours: 4, targetDate: "2025-01-08" }
      ]);

      setLoading(false);
      */
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to load data');
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  // Mock weekly data
  const weeklyHoursData = [
    { day: 'Mon', value: 7 }, { day: 'Tue', value: 8 }, { day: 'Wed', value: 6 },
    { day: 'Thu', value: 9 }, { day: 'Fri', value: 5 }, { day: 'Sat', value: 0 },
    { day: 'Sun', value: 0 }
  ];

  const teamUtilizationData = [65, 72, 78, 85, 82, 90, 88];

  const maxHours = Math.max(...weeklyHoursData.map(d => d.value), 1);

  // Calculate team stats with null safety
  const calculateTeamStats = () => {
    if (!users || users.length === 0) {
      return {
        avgComplianceScore: 0,
        totalCapacity: 0,
        teamUtilization: 0
      };
    }

    const avgComplianceScore = users.reduce((sum, user) => sum + (user.complianceScore || 0), 0) / users.length;
    const totalCapacity = users.reduce((sum, user) => sum + (user.dailyCapacityHours || 0), 0);
    const teamUtilization = 78;

    return {
      avgComplianceScore: Math.round(avgComplianceScore),
      totalCapacity,
      teamUtilization
    };
  };

  const teamStats = calculateTeamStats();

  // Calculate total hours for current user's tasks
  const calculateTaskStats = () => {
    if (!tasks || tasks.length === 0) {
      return { totalEstimated: 0, totalSpent: 0, percentComplete: 0 };
    }

    const totalEstimated = tasks.reduce((sum, task) => sum + (task.estimatedHours || 0), 0);
    
    // Mock spent hours calculation (in production, this would come from time tracking)
    const totalSpent = Math.floor(totalEstimated * 0.6);
    const percentComplete = totalEstimated > 0 ? Math.round((totalSpent / totalEstimated) * 100) : 0;

    return { totalEstimated, totalSpent, percentComplete };
  };

  const taskStats = calculateTaskStats();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Use mock data if API fails
  const displayUser = currentUser || {
    name: "Demo User",
    email: "demo@company.com",
    role: "MEMBER",
    dailyCapacityHours: 8,
    complianceScore: 100,
    complianceStreak: 0
  };

  const displayUsers = users.length > 0 ? users : [displayUser];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Left Sidebar */}
      <div className="w-16 bg-black flex flex-col items-center py-6 space-y-8">
        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-6 h-6" />
        </div>
        <Home className="w-6 h-6 text-orange-500 cursor-pointer" />
        <div className="flex-1"></div>
        <Settings className="w-6 h-6 text-gray-400 cursor-pointer hover:text-orange-500" />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        {/* Error Banner */}
        {error && (
          <div className="bg-red-900 bg-opacity-50 border border-red-500 rounded-2xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
              <div>
                <p className="text-sm font-semibold">Failed to load data from API</p>
                <p className="text-xs text-red-200">{error}</p>
              </div>
            </div>
            <button 
              onClick={handleRetry}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Header Tabs */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-8">
            <button 
              className={`text-lg font-semibold pb-2 ${selectedTab === 'overview' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400'}`} 
              onClick={() => setSelectedTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`text-lg font-semibold pb-2 ${selectedTab === 'tasks' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400'}`} 
              onClick={() => setSelectedTab('tasks')}
            >
              My Tasks
            </button>
            <button 
              className={`text-lg font-semibold pb-2 ${selectedTab === 'ai' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400'}`} 
              onClick={() => setSelectedTab('ai')}
            >
              AI Assistant
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-800 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-6 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              Hello, {displayUser.name?.split(' ')[0] || 'User'}!
            </h1>
            <p className="text-orange-100">
              You have {tasks.length} active tasks • Team capacity: {teamStats.teamUtilization}% utilized
            </p>
          </div>
          <button className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center hover:bg-gray-900">
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Conditional Content Based on Selected Tab */}
        {selectedTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Weekly Hours Tracked */}
          <div className="bg-gray-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 font-medium">Hours This Week</h3>
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex items-end space-x-1 mb-3 h-24">
              {weeklyHoursData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end">
                  <div 
                    className={`rounded-t ${i === 3 ? 'bg-white' : 'bg-gray-600'}`} 
                    style={{ height: `${(data.value / maxHours) * 100}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <p className="text-2xl font-bold">35 <span className="text-sm text-gray-400 font-normal">hrs</span></p>
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
                  strokeDashoffset={351.86 - (351.86 * teamStats.avgComplianceScore / 100)} 
                  strokeLinecap="round" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-bold">{teamStats.avgComplianceScore}%</p>
                <p className="text-xs text-gray-400">Score</p>
              </div>
            </div>
          </div>

          {/* Active Tasks */}
          <div className="bg-gray-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-200 font-medium">Priority Task</h3>
            </div>
            {loadingTasks ? (
              <div className="flex items-center justify-center h-24">
                <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">
                  {tasks[0]?.title || 'No tasks available'}
                </h2>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold">
                      {taskStats.totalSpent}/{taskStats.totalEstimated}
                      <span className="text-sm text-gray-400"> hrs</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      {taskStats.percentComplete}% complete
                    </p>
                  </div>
                  <button className="w-12 h-12 bg-gray-700 rounded-2xl flex items-center justify-center hover:bg-gray-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Team Members */}
          <div className="bg-gray-800 rounded-3xl p-6 flex flex-col h-full">
            <div className="flex items-center mb-4">
              <UserCheck className="w-5 h-5 text-white mr-2" />
              <h3 className="font-medium text-gray-400">Team Members</h3>
            </div>
            <div className="space-y-3 overflow-y-auto flex-1 pr-2" style={{ maxHeight: '280px' }}>
              {displayUsers.map(user => (
                <button
                  key={user.id || Math.random()}
                  onClick={() => handleUserClick(user)}
                  className={`w-full text-left text-sm flex justify-between items-center p-3 rounded-xl transition-all ${
                    currentUser?.id === user.id 
                      ? 'bg-orange-500 bg-opacity-20 border border-orange-500' 
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <div>
                    <p className="font-medium">{user.name || 'Unknown'}</p>
                    <p className="text-gray-400 text-xs">{user.role || 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-green-400">
                      {user.complianceScore || 0}%
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.dailyCapacityHours || 0}h
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Utilization Trend */}
          <div className="col-span-2 bg-gray-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-orange-500 mr-2" />
                <h3 className="font-medium">Team Bandwidth Trend</h3>
                <span className="ml-3 text-sm text-green-400">+12% · Improving</span>
              </div>
              <p className="text-3xl font-bold">88<span className="text-sm text-gray-400">%</span></p>
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
                  d={`M 0 ${100 - teamUtilizationData[0]} ${teamUtilizationData.map((d, i) => 
                    `L ${(i * 400) / (teamUtilizationData.length - 1)} ${100 - d}`
                  ).join(' ')} L 400 100 L 0 100 Z`} 
                  fill="url(#trendGradient)" 
                />
                <path 
                  d={`M 0 ${100 - teamUtilizationData[0]} ${teamUtilizationData.map((d, i) => 
                    `L ${(i * 400) / (teamUtilizationData.length - 1)} ${100 - d}`
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
          </>
        )}

        {/* AI Assistant Tab */}
        {selectedTab === 'ai' && (
          <div className="flex flex-col h-full">
            <div className="bg-gray-800 rounded-3xl p-6 flex-1 flex flex-col" style={{ height: 'calc(100vh - 280px)' }}>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <MessageCircle className="w-6 h-6 mr-2 text-orange-500" />
                AI Assistant
              </h2>
              
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
                {aiMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <MessageCircle className="w-16 h-16 mb-4 opacity-50" />
                    <p className="text-lg">Ask me anything!</p>
                    <p className="text-sm">I can help you with tasks, team info, and general questions.</p>
                  </div>
                ) : (
                  aiMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-3xl rounded-2xl p-4 ${
                        msg.role === 'user' 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-gray-700 text-gray-100'
                      }`}>
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))
                )}
                {aiLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 rounded-2xl p-4">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleAiSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-700 text-white rounded-2xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={aiLoading}
                />
                <button
                  type="submit"
                  disabled={aiLoading || !aiInput.trim()}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-2xl px-6 py-3 font-semibold transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - User Profile */}
      <div className="w-96 bg-orange-500 p-8 flex flex-col">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{displayUser.name || 'User'}</h2>
          <p className="text-sm opacity-90">{displayUser.role || 'N/A'}</p>
          <p className="text-sm opacity-90 mt-1">{displayUser.email || 'N/A'}</p>
        </div>

        <div className="flex-1 bg-orange-400 rounded-3xl relative overflow-hidden mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-orange-600 rounded-full opacity-50"></div>
          </div>
        </div>

        <div className="bg-black rounded-3xl p-6">
          <h3 className="text-lg font-semibold mb-4">Today's Capacity</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Daily Capacity</span>
              <span className="font-bold">{displayUser.dailyCapacityHours || 0} hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Compliance Score</span>
              <span className="font-bold">{displayUser.complianceScore || 0}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Current Streak</span>
              <span className="font-bold">{displayUser.complianceStreak || 0} days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTrackerDashboard;