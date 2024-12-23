import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode'; // Install this with `npm install jwt-decode`
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Bot, User, LogOut, Settings } from 'lucide-react';

const SharedLayout = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [decodedUser, setDecodedUser] = useState(null); // Store decoded user information
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/chat', label: 'Chat' },
    { path: '/docs', label: 'Documentation' },
    { path: '/about', label: 'About' },
  ];

  useEffect(() => {
    // Decode the token to extract user information
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the JWT
        setDecodedUser(decoded); // Store decoded user info
      } catch (error) {
        console.error('Invalid token:', error);
        handleLogout(); // Logout if token is invalid
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setUser(null); // Update the user state to null
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="bg-black">
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-gray-800">
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

              {!user ? (
                <Link
                  to="/login"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Login
                </Link>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white"
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-800 rounded-lg shadow-lg py-2">
                      <div className="px-4 py-3 border-b border-gray-800">
                        {decodedUser ? (
                          <>
                            <p className="text-sm text-white">{decodedUser.username}</p>
                            <p className="text-xs text-gray-400">{decodedUser.email}</p>
                          </>
                        ) : (
                          <p className="text-sm text-gray-400">User information not available</p>
                        )}
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Profile Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-800"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
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
              {!user && (
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;
