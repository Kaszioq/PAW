import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./post.scss";

interface PostType {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const Post: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Error:", err));
  }, [id]);

  return (
    <div className="post-page">
      {post ? (
        <article className="post-article">
          <img
            src="https://via.placeholder.com/1200x400"
            alt="Post Cover"
            className="post-cover"
          />
          <h1>{post.title}</h1>
          <p className="author">Author: User #{post.userId}</p>
          <p className="body">{post.body}</p>
        </article>
      ) : (
        <p className="loading">Loading or no post found...</p>
      )}
    </div>
  );
};

export default Post;
