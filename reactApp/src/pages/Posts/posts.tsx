import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../api/postsApi";
import "./posts.scss";

interface PostType {
  id: number;
  title: string;
  content: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  return (
    <div className="posts-page">
      <h2>All Posts</h2>
      {posts.length > 0 ? (
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post.id} className="post-item">
              <h3>{post.title}</h3>
              <p>{post.content.substring(0, 100)}...</p>
              <Link to={`/post/${post.id}`} className="read-more">Read More</Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
};

export default Posts;
