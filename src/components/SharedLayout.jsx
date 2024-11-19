// SharedLayout.jsx
import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Menu, X, Bot } from 'lucide-react';

const SharedLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { path: '/chat', label: 'Chat' },
    { path: '/docs', label: 'Documentation' },
    { path: '/about', label: 'About' },
  ];

  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed w-full z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-indigo-500" />
              <span className="text-xl font-bold text-white">BotForge</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`text-gray-300 hover:text-white transition-colors ${
                    location.pathname === path ? 'text-white' : ''
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/dashboard"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Dashboard
              </Link>
            </div>

            <button
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="px-2 py-3 space-y-1">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`block px-3 py-2 text-base ${
                    location.pathname === path
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-base text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;