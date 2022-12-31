import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Stranger's Things</h1>
      <p>
      Stranger's Things is a marketplace where users can buy and sell items with ease. Whether you're looking for a new piece of furniture, a rare collectible, or anything in between, you can find it on our platform.      </p>
      <ul>
        <li>
          <Link to="/posts">Browse Posts</Link>
        </li>
        <li>
          <Link to="/profile">View Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
