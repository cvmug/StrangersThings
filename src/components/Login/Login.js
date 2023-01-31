import React, { useState } from 'react';
import { BASE_URL } from '../../api';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const token = window.localStorage.getItem('token');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await axios.post(`${BASE_URL}/users/login`, {
      user: {
        username,
        password,
      },
    });

    if (result.data.error) {
      setError(result.data.error);
    } else {
      const token = result.data.data.token;
      window.localStorage.setItem('token', token);
      window.location.href = '/profile';
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.location.href = '/login';
    }

    return (
      <div className="Login">
        {error &&
          <div className="Login-error">
            <p>{error.name}</p>
            <p>{error.message}</p>
          </div>
        }
        {localStorage.getItem('token') ? (
          <div className="Login-message">
          <button onClick={handleLogout}>Log out</button>
          </div>
        ) : (
          <form className="Login-form" onSubmit={handleSubmit}>
            <input
              className="Login-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="Login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="Login-submit" type="submit">Login</button>
            <div className="Login-register">
              Don't have an account? <Link to="/register">Register</Link>
            </div>
          </form>
        )}
      </div>
    );
  };

export default Login;
