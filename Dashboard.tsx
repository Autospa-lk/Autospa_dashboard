import React, { useState } from 'react';
import { Home, Droplets, Calendar, PieChart, Settings, Monitor, Bell, Menu, X, LogOut, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useNavigate } from 'react-router-dom';
import CleaningStatus from './dashboard/CleaningStatus';
import Schedule from './dashboard/Schedule';
import Reports from './dashboard/Reports';
import SettingsPage from './dashboard/Settings';
import Devices from './dashboard/Devices';

const mockData = {
  cleaningStats: [
    { name: 'Mon', value: 65 },
    { name: 'Tue', value: 75 },
    { name: 'Wed', value: 85 },
    { name: 'Thu', value: 70 },
    { name: 'Fri', value: 90 },
    { name: 'Sat', value: 80 },
    { name: 'Sun', value: 95 },
  ],
  waterUsage: [
    { name: 'Mon', usage: 20 },
    { name: 'Tue', usage: 15 },
    { name: 'Wed', usage: 25 },
    { name: 'Thu', usage: 22 },
    { name: 'Fri', usage: 18 },
    { name: 'Sat', usage: 23 },
    { name: 'Sun', usage: 19 },
  ],
};

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  const sidebarItems = [
    { icon: <Home size={20} />, label: 'Home', id: 'home' },
    { icon: <Droplets size={20} />, label: 'Cleaning Status', id: 'cleaning' },
    { icon: <Calendar size={20} />, label: 'Schedule', id: 'schedule' },
    { icon: <PieChart size={20} />, label: 'Reports', id: 'reports' },
    { icon: <Monitor size={20} />, label: 'Devices', id: 'devices' },
    { icon: <Settings size={20} />, label: 'Settings', id: 'settings' },
  ];

  // Function to render the active section
  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <main className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* Cleaning Status Widget */}
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-white text-lg font-semibold mb-4">Current Cleaning Status</h3>
                <div className="flex items-center justify-between">
                  <div className="relative w-24 h-24">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#444"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#ff4444"
                        strokeWidth="3"
                        strokeDasharray="75, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-lg">75%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 text-2xl font-bold">In Progress</p>
                    <p className="text-gray-400">Est. 5 mins remaining</p>
                  </div>
                </div>
              </div>

              {/* Water Usage Widget */}
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-white text-lg font-semibold mb-4">Water Usage</h3>
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData.waterUsage}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip />
                      <Area type="monotone" dataKey="usage" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* AI Analytics Widget */}
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-white text-lg font-semibold mb-4">Cleaning Performance</h3>
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData.cleaningStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Activities & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-white text-lg font-semibold mb-4">Recent Activities</h3>
                <div className="space-y-4">
                  {[
                    { time: '2h ago', text: 'Cleaning cycle completed', status: 'success' },
                    { time: '4h ago', text: 'Water filter maintenance required', status: 'warning' },
                    { time: '6h ago', text: 'System update installed', status: 'info' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'success' ? 'bg-green-400' :
                        activity.status === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                      }`} />
                      <div>
                        <p className="text-white">{activity.text}</p>
                        <p className="text-gray-400 text-sm">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-white text-lg font-semibold mb-4">System Alerts</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Low Water Level', description: 'Water tank needs refilling', priority: 'high' },
                    { title: 'Scheduled Maintenance', description: 'Due in 3 days', priority: 'medium' },
                  ].map((alert, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{alert.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs ${
                          alert.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {alert.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-400">{alert.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        );
      case 'cleaning':
        return <CleaningStatus />;
      case 'schedule':
        return <Schedule />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <SettingsPage />;
      case 'devices':
        return <Devices />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        className="w-64 bg-gray-800 text-white p-4 flex flex-col"
      >
        <div className="flex items-center justify-between mb-8">
          <img 
            src="/images/autospa1.svg" 
            alt="Logo" 
            className="h-8 cursor-pointer" 
            onClick={() => navigate('/')}
          />
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg mb-2 transition-colors ${
                activeSection === item.id ? 'bg-red-600' : 'hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={() => navigate('/')} 
          className="flex items-center space-x-3 p-3 text-gray-400 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className={`text-white ${isSidebarOpen ? 'hidden' : 'block'}`}
            >
              <Menu size={24} />
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <ChevronLeft size={20} />
              <span>Back to Home</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-white">
              <Bell size={20} />
            </button>
            <div className="flex items-center space-x-3">
              <img
                src="/images/user.png"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white">John Doe</span>
            </div>
          </div>
        </header>

        {/* Replace the main content with the renderSection function */}
        {renderSection()}
      </div>
    </div>
  );
};

export default Dashboard; 