import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface PostType {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const Post: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data: PostType) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="app-container">
        <div className="background-shapes"></div>
        <p className="loading">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="app-container">
        <div className="background-shapes"></div>
        <p className="loading">Post not found.</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="background-shapes"></div>
      <div className="posts-grid post-centered">
        <div className="post-card">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-body expanded">{post.body}</p>
          <div className="divider"></div>
        </div>
      </div>
    </div>
  );
};

export default Post;
