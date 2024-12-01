import React, { useState } from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Bot, Users, MessageCircle, Activity, Settings, Menu, X } from 'lucide-react';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const apiData = [
    { name: 'Jan', requests: 3400 },
    { name: 'Feb', requests: 2800 },
    { name: 'Mar', requests: 4300 },
    { name: 'Apr', requests: 3900 },
    { name: 'May', requests: 4800 }
  ];

  const models = [
    { name: 'GPT-4', status: 'Active', usage: '78%' },
    { name: 'Claude 2', status: 'Active', usage: '65%' },
    { name: 'GPT-3.5', status: 'Active', usage: '89%' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-800 
        transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        z-40
      `}>
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-8">
            <Bot className="text-indigo-500 h-8 w-8" />
            <span className="text-xl font-bold">BotForge</span>
          </div>
          <nav className="space-y-2">
            {[
              { icon: Activity, label: 'Overview', active: true },
              { icon: Bot, label: 'Models' },
              { icon: Users, label: 'Users' },
              { icon: MessageCircle, label: 'Conversations' },
              { icon: Settings, label: 'Settings' }
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                className={`flex items-center space-x-2 p-3 rounded-lg
                  ${item.active ? 'bg-indigo-500/10 text-indigo-500' : 'text-gray-400 hover:bg-gray-800'}
                `}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="grid gap-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Requests', value: '157,293' },
              { label: 'Active Users', value: '1,234' },
              { label: 'Response Time', value: '145ms' },
              { label: 'Success Rate', value: '99.9%' }
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-semibold mt-2">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* API Requests Chart */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-lg font-semibold mb-4">API Requests</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={apiData}>
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="requests" 
                      stroke="#6366F1" 
                      strokeWidth={2} 
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Model Status */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h3 className="text-lg font-semibold mb-4">Model Status</h3>
              <div className="space-y-4">
                {models.map((model) => (
                  <div key={model.name} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{model.name}</p>
                      <p className="text-sm text-gray-400">Usage: {model.usage}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-500">
                      {model.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium">API Request #{i}</p>
                    <p className="text-sm text-gray-400">2 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;