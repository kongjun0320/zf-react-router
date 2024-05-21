import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
} from './react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
import Post from './components/Post';
import UserList from './components/UserList';
import UserAdd from './components/UserAdd';
import UserDetail from './components/UserDetail';

import './index.css';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Protected from './components/Protected';

const root = ReactDOM.createRoot(document.getElementById('root'));

const activeStyle = {
  backgroundColor: 'green',
};
const activeClassName = 'active';
const activeNavProps = {
  style: ({ isActive }) => (isActive ? activeStyle : {}),
  className: ({ isActive }) => (isActive ? activeClassName : ''),
};

root.render(
  <BrowserRouter>
    <ul>
      <li>
        <NavLink end={true} to="/" {...activeNavProps}>
          首页
        </NavLink>
      </li>
      <li>
        <NavLink to="/user" {...activeNavProps}>
          用户管理
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile" {...activeNavProps}>
          个人中心
        </NavLink>
      </li>
    </ul>
    <Routes>
      <Route path="/post/:id" element={<Post />} />
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<User />}>
        <Route path="list" element={<UserList />} />
        <Route path="add" element={<UserAdd />} />
        <Route path="detail/:id" element={<UserDetail />} />
      </Route>
      <Route
        path="/profile"
        element={<Protected component={<Profile />} path="/profile" />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
