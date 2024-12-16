import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  LogIn, 
  Github, 
  Linkedin, 
  AlertTriangle 
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    navigate('/login');
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Decode the Google credential
      const decoded = jwtDecode(credentialResponse.credential);
      
      // Extract user information from the decoded token
      const { email, name } = decoded;

      // Send the Google user data to your backend
      const response = await axios.post('http://localhost:5000/user/callback', {
        email,
        username: name,
        googleId: decoded.sub // Google's unique user ID
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      if (response.status === 201) {
        setMessage('Signup successful');
        // localStorage.setItem();
        setError('');
        navigate('/login');
      } else {
        setMessage('Signup failed');
      }
    } catch (error) {
      setError('An error occurred during Google signup');
      console.error(error);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Sign-In was unsuccessful', error);
    setError('Google Sign-In failed');
  };

  const handleStandardSignup = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPass) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/user/signup', {
        email,
        username,
        password,
        confirmPass
      }, {
        headers: {
          'Content-Type': 'application/json',

        },
        withCredentials:true
      });

      if (response.status === 201) {
        setMessage('Signup successful');
        setError('');
        navigate('/login')
      } else {
        setMessage('Signup failed');
      }
    } catch (error) {
      setError('An error occurred during signup');
      console.log(error);
    }
  };

  return (
    <div className="w-screen flex items-center justify-center bg-gray-900 px-4 py-8">
      <div className="w-full max-w-md bg-gray-800 shadow-2xl rounded-2xl overflow-hidden border border-gray-700">
        <div className="p-8 space-y-6">
          {/* Company Logo and Title */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-blue-500"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M12 22V11l-4-2"/>
                <path d="M16 13l-4-2"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-100">AI Bot Platform</h1>
            <p className="text-gray-400 mt-2">Create your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/30 border border-red-600 text-red-300 px-4 py-3 rounded-lg flex items-center">
              <AlertTriangle className="mr-2 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleStandardSignup} className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-gray-500 h-5 w-5" />
              </div>
              <input 
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Username Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="text-gray-500 h-5 w-5" />
              </div>
              <input 
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-500 h-5 w-5" />
              </div>
              <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-500 h-5 w-5" />
              </div>
              <input 
                type="password"
                placeholder="Confirm Password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            >
              <LogIn className="mr-2 h-5 w-5" /> Sign Up
            </button>
          </form>

          {/* Social Signup Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Signup Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <GoogleOAuthProvider 
              clientId="240605677314-gbb00fo5vniqo8gk1ask03im88ak48ts.apps.googleusercontent.com"
              className="w-full"
            >
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
                type="icon"
                theme="filled_blue"
                size="large"
                text="continue_with"
                width="350"
              />
            </GoogleOAuthProvider>

            <button 
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-lg shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700"
            >
              <Linkedin className="h-5 w-5 mr-2" /> LinkedIn
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="mt-2 text-sm text-gray-500">
              Already have an account?{' '}
              <a 
                href="#" 
                onClick={handleLogin}
                className="font-medium text-blue-500 hover:text-blue-400"
              >
                Log in
              </a>
            </p>
            {message && <p className="text-green-500 mt-2 text-center">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;