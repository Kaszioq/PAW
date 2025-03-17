import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Main.scss";

interface PostType {
  id: number;
  title: string;
  content: string;
}

const API_URL = "http://localhost:5000";

const Main: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      setPosts(response.data.slice(0, 3)); // Only show 3 posts
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="main-container">
      <h1>Welcome to MyBlog</h1>
      <p>Discover amazing stories, guides, and insights.</p>

      <div className="featured-posts">
        <h2>Featured Posts</h2>
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <img
                src={`https://source.unsplash.com/400x250/?blog,${post.id}`} // Random blog images
                alt="Post Cover"
                className="post-cover"
              />
              <h3>{post.title}</h3>
              <p>{post.content.substring(0, 100)}...</p>
              <Link to={`/post/${post.id}`} className="read-more">
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Link to="/posts" className="view-all-btn">
        View All Posts
      </Link>
    </div>
  );
};

export default Main;
