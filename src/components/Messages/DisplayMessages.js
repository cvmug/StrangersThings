import React, { useState, useEffect } from 'react';
import './DisplayMessages.css'

const DisplayMessages = ({ userId, token }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [sentExpanded, setSentExpanded] = useState(false);
  const [receivedExpanded, setReceivedExpanded] = useState(false);
  
  useEffect(() => {
    console.log('making API call');
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/users/me', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
        setMessages(result.data.messages);
        console.log('setting messages', result.data.messages);
      })
      .catch(error => {
        console.log('error occurred', error);
        setError(error);
      });
  }, [userId, token]);

    
  return (
    <div className='display-messages'>
      
      <h2 onClick={() => setSentExpanded(!sentExpanded)}>
        Sent Messages {sentExpanded ? '▲' : '▼'}
      </h2>
      {sentExpanded && (
        <div>
          {messages && messages.length > 0 ? (
            messages
              .filter(message => message.fromUser._id === userId)
              .map(message => (
                <div className='message-section' key={message._id}>
                  <p className='message-header'>Post: {message.post.title}</p>
                  <div className='message-content'>
                  <p>To: {message.fromUser.username}</p>
                  <p>Message: {message.content}</p>
                  </div>
                </div>
              ))
          ) : (
            <p>No sent messages to display</p>
          )}
        </div>
      )}
      <h2 onClick={() => setReceivedExpanded(!receivedExpanded)}>
        Received Messages {receivedExpanded ? '▲' : '▼'}
      </h2>
      {receivedExpanded && (
        <div>
          {messages && messages.length > 0 ? (
            messages
              .filter(message => message.fromUser._id !== userId)
              .map(message => (
                <div className='message-section' key={message._id}>
                  <p className='message-header'>Post: {message.post.title}</p>
                  <div className='message-content'>
                  <p>To: {message.fromUser.username}</p>
                  <p>Message: {message.content}</p>
                  </div>
                </div>
              ))
          ) : (
            <p>No received messages to display</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayMessages;