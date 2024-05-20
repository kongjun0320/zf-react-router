import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from './react-router-dom';
// import Home from './components/Home';
import User from './components/User';
// import Profile from './components/Profile';
// import Post from './components/Post';
import UserList from './components/UserList';
import UserAdd from './components/UserAdd';
import UserDetail from './components/UserDetail';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ul>
      <li>
        <Link to="/">首页</Link>
      </li>
      <li>
        <Link to="/user">用户管理</Link>
      </li>
      <li>
        <Link to="/profile">个人中心</Link>
      </li>
    </ul>
    <Routes>
      {/* <Route path="/post/:id" element={<Post />} />
      <Route path="/" element={<Home />} /> */}
      <Route path="/user" element={<User />}>
        <Route path="list" element={<UserList />} />
        <Route path="add" element={<UserAdd />} />
        {/* <Route path="detail/:id" element={<UserDetail />} /> */}
      </Route>
      {/* <Route path="/profile" element={<Profile />} /> */}
    </Routes>
  </BrowserRouter>
);
