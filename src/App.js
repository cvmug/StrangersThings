import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Title from './components/Title';
import Posts from './components/AllPosts/Posts';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Profile from './components/Profile';
import Login from './components/Login/Login';
import './App.css';
import CreatePost from './components/AllPosts/CreatePost';
import Home from './components/Home';

export const BASE_URL = 'https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT';

function App() {
  
  return (
    <div className='App'>
      <Title />
      <BrowserRouter>
          <Link to="/posts">Posts</Link>
          <Link to="/profile">Profile</Link>
          <Link to='/login'>Log In</Link>
          <Link to='/home'>Home</Link>
        <Routes>
          <Route path='/newpost' element={<CreatePost />} />
          <Route path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/posts' element={<Posts />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
