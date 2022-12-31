import React, { useState } from 'react';

const DeletePost = ({ postId }) => {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/posts/${postId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setSuccessMessage('Post deleted successfully');
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <button onClick={handleDelete}>Delete Post</button>
    </div>
  );
};

export default DeletePost;
