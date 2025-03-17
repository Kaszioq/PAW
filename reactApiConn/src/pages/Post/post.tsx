import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface PostType {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const fetchPost = async (id: string): Promise<PostType> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!response.ok) {
    throw new Error("Post not found");
  }
  return response.json();
};

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: post, isLoading, isError } = useQuery<PostType>({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="app-container">
        <div className="background-shapes"></div>
        <p className="loading">Loading...</p>
      </div>
    );
  }

  if (isError || !post) {
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