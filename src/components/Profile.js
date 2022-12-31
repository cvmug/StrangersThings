import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import DisplayMessages from './Messages/DisplayMessages';

export default function Profile() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    setToken(token);
    if (token) {
      fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/users/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          const user = result.data;
          setUser(user);
        })
        .catch((error) => setError(error));
    }
  }, [token]);

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="profile">
      {error && <p className="error">An error occurred: {error.message}</p>}
      {token ? (
        <>
          <h2>Welcome {user.username} </h2>
          <button>
            <Link to="/newpost">New Post</Link>
          </button>
          <button onClick={handleLogout}>Log out</button>
          <DisplayMessages userId={user._id} token={token} />
        </>
      ) : (
        <p className='loggedout'>
          You are not logged in. <Link to="/login">Log in</Link> to see your profile.
        </p>
      )}
    </div>
  );
};
