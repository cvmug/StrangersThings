import React, { useState } from 'react';
import SendMessage from './SendMessage';

const MessageButton = ({ postId, onSendMessage }) => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <button onClick={handleClick}>Send Message</button>
      {showForm && (
        <SendMessage postId={postId} onSend={onSendMessage} />
      )}
    </div>
  );
};

export default MessageButton;
