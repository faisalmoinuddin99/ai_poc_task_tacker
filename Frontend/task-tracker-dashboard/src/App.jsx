// src/App.jsx

import { useState, useEffect } from "react";

// import { MainLayout } from './components/layout/MainLayout';
import { OverviewTab } from "./components/dashboard/OverviewTab";
import { TasksTab } from "./components/dashboard/TasksTab";
import { AITab } from "./components/dashboard/AITab";
import { LoadingSpinner } from "./components/common/LoadingSpinner";

import { fetchUsers, fetchTasksForUser } from "./services/api";
import { calculateTeamStats, calculateTaskStats } from "./utils/calculations";
import { MainLayout } from "./components/layouts/MainLayout";
import { AiTab2 } from "./components/dashboard/AiTab2";


function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("overview");

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const usersData = await fetchUsers();
        setUsers(usersData);

        const defaultUser =
          usersData.find((u) => u.email === "rahul@company.com") ||
          usersData[0];
        setCurrentUser(defaultUser);

        const userTasks = await fetchTasksForUser(defaultUser.email);
        setTasks(userTasks);
      } catch (error) {
        // ← Changed 'err' to 'error' (or just remove if not using)
        console.error("Load error:", error);
        setError(error.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleUserSelect = async (user) => {
    if (currentUser?.id === user.id) return;

    setLoadingTasks(true);
    setCurrentUser(user);
    try {
      const userTasks = await fetchTasksForUser(user.email);
      setTasks(userTasks);
    } catch (error) {
      // ← Also fixed here
      console.error("Failed to load tasks:", error);
      setError("Failed to load tasks");
    } finally {
      setLoadingTasks(false);
    }
  };

  const teamStats = calculateTeamStats(users);
  const taskStats = calculateTaskStats(tasks);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <MainLayout
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      currentUser={currentUser}
      tasks={tasks} // ← Required for MainLayout
      error={error}
      onRetry={() => window.location.reload()}
    >
      {selectedTab === "overview" && (
        <OverviewTab
          currentUser={currentUser}
          tasks={tasks}
          setTasks={setTasks} // <-- Important!
          users={users}
          teamStats={teamStats}
          taskStats={taskStats}
          onUserSelect={handleUserSelect}
          loadingTasks={loadingTasks}
        />
      )}

      {selectedTab === "tasks" && (
        <TasksTab
          tasks={tasks}
          currentUser={currentUser}
          loadingTasks={loadingTasks}
        />
      )}

      {selectedTab === "ai" && <AITab />}
      {selectedTab === "ai2" && <AiTab2 />}
    </MainLayout>
  );
}

export default App;
