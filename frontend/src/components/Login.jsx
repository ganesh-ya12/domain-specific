import React, { useState } from 'react';
import {
  Mail,
  Lock,
  LogIn,
  Github,
  Linkedin,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Add navigation hook
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear any previous messages
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/user/login', 
        { email, password }, 
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200) {
        setMessage('Login successful');
        navigate('/')
      } else {
        setMessage(response);
      }
    } catch (error) {
      setError('Invalid email or password');
      console.log(error);
    }
  };

  // Handler for Google login
  const handleGoogleLogin = async (credentialResponse) => {
    try {
     // console.log(credentialResponse);
      const response = await axios.post('http://localhost:5000/user/callback',
        {
          googleId: credentialResponse.googleId,
          email: credentialResponse.email,
          username: credentialResponse.name
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        setMessage(response.data.message);
        navigate('/');
      } else {
        setError('Google login failed');
      }
    } catch (error) {
      setError('Error during Google login');
      console.log(error);
    }
  };
  

  // Handler for navigating to signup page
  const handleSignupNavigation = () => {
    navigate('/signup');
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
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 22V11l-4-2" />
                <path d="M16 13l-4-2" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-100">AI Bot Platform</h1>
            <p className="text-gray-400 mt-2">Sign in to your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/30 border border-red-600 text-red-300 px-4 py-3 rounded-lg flex items-center">
              <AlertTriangle className="mr-2 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 bg-gray-700 border-gray-600 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-500 hover:text-blue-400"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            >
              <LogIn className="mr-2 h-5 w-5" /> Sign In
            </button>
          </form>

          {/* Social Login Divider */}
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

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <GoogleOAuthProvider
              clientId="240605677314-gbb00fo5vniqo8gk1ask03im88ak48ts.apps.googleusercontent.com"
              className="w-full"
            >
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  // Decode the credential and extract user information
                  const credentialDetails = credentialResponse.credential
                    ? JSON.parse(atob(credentialResponse.credential.split('.')[1]))
                    : {};

                  const modifiedCredentialResponse = {
                    googleId: credentialDetails.sub, // Google's unique user ID
                    email: credentialDetails.email,
                    name: credentialDetails.name
                  };

                  handleGoogleLogin(modifiedCredentialResponse);
                }}
                onError={() => {
                  setError('Google login failed');
                }}
                theme="filled_black"
                shape="rectangular"
                size="large"
                text="signin_with"
                width="100%"
              />
            </GoogleOAuthProvider>

            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-lg shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700"
            >
              <Linkedin className="h-5 w-5 mr-2" /> LinkedIn
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="mt-2 text-sm text-gray-500">
              Don't have an account?{' '}
              <button
                onClick={handleSignupNavigation}
                className="font-medium text-blue-500 hover:text-blue-400"
              >
                Sign up
              </button>
            </p>
            {message && <p className="text-center mt-2 text-green-500">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;