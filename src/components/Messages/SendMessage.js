import React, { useState, useEffect } from 'react';

const SendMessage = ({ postId, authorId }) => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

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
        .catch((error) => console.log(error));
    }
  }, [token]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/posts/${postId}/messages`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        message: {
          content: message,
          author: authorId
        }
      })
    }).then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="message">Message:</label>
      <input type="text" id="message" value={message} onChange={handleChange} />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
