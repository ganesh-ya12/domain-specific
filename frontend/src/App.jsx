// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { routes } from './routes.js';
import SharedLayout from './components/SharedLayout.jsx';
import  Home from './components/Home.jsx';
import About from './components/About.jsx';
import Documentation from './components/Documentation.jsx';
import ChatBot from './components/ChatBot.jsx';
import FileUploader from './FileUpload.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
const App = () => (
  // const token = 
  
  <BrowserRouter>
  
    <SharedLayout/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/docs' element={<Documentation/>}/>
      <Route path='/chat' element={<ChatBot/>}/>
      <Route path='/fileupload' element={<FileUploader/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      {/* <Route path="/" element={<SharedLayout />}>
        {routes.map(({ path, component: Component, isPrivate }) => (
            key={path} 
            path={path} 
            element={isPrivate ? <PrivateRoute><Component /></PrivateRoute> : <Component />} 
          />
        ))}
      </Route> */}
    </Routes>
  </BrowserRouter>
);

export default App;