import React, { useState, useEffect } from 'react';

const DisplayMessages = ({ userId, token }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    console.log('making API call');
    fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/posts/${userId}/messages`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('response received');
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(result => {
        console.log('setting messages', result.data);
        setMessages(result.data);
      })
      .catch(error => {
        console.log('error occurred', error);
        setError(error);
      });
  }, [userId, token]);
  
  console.log('rendering messages', messages);
  let sentMessages = [];
  let receivedMessages = [];
  
  if (Array.isArray(messages)) {
    sentMessages = messages.filter(message => message.fromUser === userId);
    receivedMessages = messages.filter(message => message.fromUser !== userId);
  }

  return (
    <div>
      {error && <p>An error occurred: {error.message}</p>}
      <h2>Sent Messages</h2>
      {sentMessages && sentMessages.length > 0 ? (
        sentMessages.map(message => (
          <div className="message-container" key={message._id}>
            <h3>{message.toUser}</h3>
            <p>{message.content}</p>
          </div>
        ))
      ) : (
        <p>No sent messages to display</p>
      )}
      <h2>Received Messages</h2>
      {receivedMessages && receivedMessages.length > 0 ? (
        receivedMessages.map(message => (
          <div className="message-container" key={message._id}>
            <h3>{message.fromUser}</h3>
            <p>{message.content}</p>
          </div>
        ))
      ) : (
        <p>No received messages to display</p>
      )}
    </div>
  );
};

export default DisplayMessages