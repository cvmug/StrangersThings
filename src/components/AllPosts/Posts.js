import React, { useState, useEffect } from 'react';
import DeletePost from './DeletePost';
import './Posts.css';
import MessageButton from '../Messages/MessageButton';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

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

  useEffect(() => {
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/posts', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.data.posts);
        console.log(data.data.posts);
      });
  }, [token]);

  return (
    <div className="posts">
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post._id} className={post.isAuthor ? 'post author' : 'post'}>
          <>
            Title: {post.title}
            <br />
            Author: {post.author.username}
            <br />
            Location: {post.location}
            <br />
            Description: {post.description}
            <br />
            Price: {post.price}
            <br />
            Created at: {post.createdAt}
            <br />
            Updated at: {post.updatedAt}
            <br />
            {post.isAuthor ? <button className='edit'>Edit</button> : null}
            {post.isAuthor ? <DeletePost postId={post._id} /> : null}
            {!post.isAuthor ? <MessageButton postId={post._id} /> : null}
            </>
        </div>
      ))}
    </div>
  );
};