import React, { useEffect, useState } from 'react';
import { fetchUser } from '../api';
import './Profile.css';
import { Link } from 'react-router-dom';
import DisplayMessages from './Messages/DisplayMessages';

export default function Profile() {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const token = window.localStorage.getItem('token');

useEffect(() => {
  fetchUser(token, setUser, setError);
}, [token]);

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.location.href = '/login';
    }

  return (
    <div className="profile">
      {error && <p className="error">An error occurred: {error.message}</p>}
      {token ? (
        <>
          <h2>Welcome {user.username} </h2>
          <button>
            <Link to="/newpost">New Post</Link>
          </button>
          <DisplayMessages userId={user._id} token={token} />
          <button onClick={handleLogout}>Log out</button>
        </>
      ) : (
        <p className='loggedout'>
          You are not logged in. <Link to="/login">Log in</Link> to see your profile.
        </p>
      )}
    </div>
  );
};
