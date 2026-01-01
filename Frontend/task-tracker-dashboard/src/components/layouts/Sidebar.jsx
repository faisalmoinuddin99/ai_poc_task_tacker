// src/components/layout/Sidebar.jsx

import { Home } from '../icons/Home';
import { BarChart3 } from '../icons/BarChart3';  // ← Add this line
import { Settings } from '../icons/Settings';

export const Sidebar = () => (
  <div className="w-16 bg-black flex flex-col items-center py-6 space-y-8">
    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
      <BarChart3 className="w-6 h-6" />
    </div>
    <Home className="w-6 h-6 text-orange-500 cursor-pointer" />
    <div className="flex-1"></div>
    <Settings className="w-6 h-6 text-gray-400 cursor-pointer hover:text-orange-500" />
  </div>
);