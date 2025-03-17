import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

const Posts: React.FC = () => {
  const { data: posts, isLoading, isError } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);

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
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : isError ? (
        <p className="loading">Failed to load posts.</p>
      ) : (
        <div className="posts-grid">
          {posts?.map((post: Post) => (
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

export default Posts;