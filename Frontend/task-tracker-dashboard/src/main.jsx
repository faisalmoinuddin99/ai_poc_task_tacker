import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TaskTrackerDashboard from './TaskTrackerDashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <TaskTrackerDashboard/>
  </StrictMode>,
)
