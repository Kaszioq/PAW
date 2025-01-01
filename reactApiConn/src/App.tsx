import React, { useEffect, useState } from "react";
import "./App.css";

// Definicja interfejsu dla postów
interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data: Post[]) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedPosts((prev) =>
      prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]
    );
  };

  return (
    <div className="app-container">
      <div className="background-shapes"></div>
      <h1>Posts List</h1>
      <h2>&lt;Array&lt;posts&gt;&gt;</h2>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post: Post) => (
            <div key={post.id} className="post-card">
              <h2
                className="post-title"
                onClick={() => toggleExpand(post.id)}
                style={{ cursor: "pointer" }}
              >
                {post.title}
              </h2>
              <p
                className={`post-body ${
                  expandedPosts.includes(post.id) ? "expanded" : "collapsed"
                }`}
              >
                {post.body}
              </p>
              <div className="divider"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
