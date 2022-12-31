import React, { useState } from 'react';
import './CreatePost.css'

export default function CreatePost() {
  // use state variables to store the form input values
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // state for success message
  const [error, setError] = useState(''); // state for any error messages

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent the form from refreshing the page

    // create the post object to be sent to the API
    const post = {
      title,
      description,
      price,
    };
    
    try {
      // send the post to the API
      const response = await fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/posts', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          post: {
            title: title,
            description: description,
            price: price,
          }
        })
      });
      const result = await response.json();
      // check if the API call was successful
      if (response.ok) {
        // clear the form input values and set the success message
        setTitle('');
        setDescription('');
        setPrice('');
        setSuccessMessage('Post created successfully!');
      } else {
        // handle any errors that occurred during the API call
        setError(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {successMessage && <div className="success">{successMessage}</div>}
      {error && <div className="error">{error}</div>}
        <label htmlFor="title">Title:
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
        </label>
        <label htmlFor="description">
          Description:
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <label htmlFor="price">
          Price:
          <input
            type="text"
            id="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </label>
        <button type="submit">Create Post</button>
    </form>
  );
}