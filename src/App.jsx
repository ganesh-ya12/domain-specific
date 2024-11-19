// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes.js';
import SharedLayout from './components/SharedLayout.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        {routes.map(({ path, component: Component, isPrivate }) => (
          <Route 
            key={path} 
            path={path} 
            element={isPrivate ? <PrivateRoute><Component /></PrivateRoute> : <Component />} 
          />
        ))}
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;