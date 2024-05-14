import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter, Routes, Route } from './react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<User />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
);
