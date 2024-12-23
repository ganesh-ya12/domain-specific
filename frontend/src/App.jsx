import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import SharedLayout from './components/SharedLayout.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Documentation from './components/Documentation.jsx';
import ChatBot from './components/ChatBot.jsx';
import FileUploader from './FileUpload.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

const AppContent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (token) {
      setUser(token); 
      console.log(token);
      navigate('/chat');
    }
  }, []);

  return (
    <>
      {/* Pass the `user` state and `setUser` function to SharedLayout */}
      <SharedLayout user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/docs' element={<Documentation />} />
        <Route path='/chat' element={<ChatBot />} />
        <Route path='/fileupload' element={<FileUploader />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
