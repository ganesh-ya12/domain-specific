// Layout.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bot } from 'lucide-react';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { href: '/chat', label: 'Chat' },
    { href: '/docs', label: 'Documentation' },
    { href: '/about', label: 'About' }
  ];

  return (
    <div className="min-h-screen bg-black">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 shrink-0">
              <Bot className="h-8 w-8 text-indigo-500" />
              <span className="text-xl font-bold text-white hidden sm:block">BotForge</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  to={href}
                  className={`text-sm text-gray-300 hover:text-white transition-colors ${
                    location.pathname === href ? 'text-white' : ''
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition-colors"
              >
                Dashboard
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          md:hidden transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-y-0' : '-translate-y-full'}
          absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800
        `}>
          <div className="px-4 py-3 space-y-3">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className={`block px-3 py-2 rounded-lg text-base ${
                  location.pathname === href
                    ? 'text-white bg-gray-900'
                    : 'text-gray-300 hover:text-white hover:bg-gray-900'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-lg text-base bg-indigo-600 text-white text-center hover:bg-indigo-700"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;