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
const App = () => (
  
  <BrowserRouter>
  
    <SharedLayout/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/docs' element={<Documentation/>}/>
      <Route path='/chat' element={<ChatBot/>}/>
      <Route path='/fileupload' element={<FileUploader/>}/>
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