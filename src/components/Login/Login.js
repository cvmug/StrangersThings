import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [form, setForm] = useState('login');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    setToken(token)
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
        .catch((error) => console.log(error));
    }
  }, [token]);

  const handleFormChange = (e) => {
    e.preventDefault();
    setForm(e.target.name);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'registerUsername') {
      setRegisterUsername(value);
    } else if (name === 'registerPassword') {
      setRegisterPassword(value);
    } else if (name === 'loginUsername') {
      setLoginUsername(value);
    } else if (name === 'loginPassword') {
      setLoginPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form === 'register') {
      fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/users/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: registerUsername,
            password: registerPassword
          },
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          // Show a confirmation message
          alert('Successfully registered! Please log in to continue.');
          // Navigate to the '/login' route
          navigate('/login');
        })
        .catch((error) => console.log(error));

    } else {

      fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: loginUsername,
            password: loginPassword,
          },
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          const token = result.data.token;
          window.localStorage.setItem('token', token);
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
              navigate('/profile')
            })
            .catch((console.error));
        })
        .catch((error) => {
          setError('Invalid username or password'); // added error handling
          console.log(error);
        });
    }
  };
  
    const logout = () => {
      window.localStorage.removeItem('token');
      setUser({});
    };
  
    return (
      <div>
        <h1>{form === 'login' ? 'Log In' : 'Register'}</h1>
        {user._id ? (
       <>
         <button onClick={logout}>Logout</button>
       </>
     ) : null}
        {form === 'login' ? (
          <form onSubmit={handleSubmit}>
            <input
              placeholder="username"
              name="loginUsername"
              value={loginUsername}
              onChange={handleInputChange}
            />
            <input type='password'
              placeholder="password"
              name="loginPassword"
              value={loginPassword}
              onChange={handleInputChange}
            />
            <button>Log In</button>
            {error ? <p className='error'>{error}</p> : null}
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              placeholder="username"
              name="registerUsername"
              value={registerUsername}
              onChange={handleInputChange}
            />
            <input type='password'
              placeholder="password"
              name="registerPassword"
              value={registerPassword}
              onChange={handleInputChange}
            />
            <button>Register</button>
          </form>
        )}
        <div>
          {form === 'login' ? (
            <p>
              Don't have an account?{' '}
              <a href="#" name="register" onClick={handleFormChange}>
                Register
              </a>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <a href="#" name="login" onClick={handleFormChange}>
                Log In
              </a>
            </p>
          )}
        </div>
        </div>
    );
          };
    
    
  