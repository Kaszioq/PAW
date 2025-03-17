import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./post.scss";

interface PostType {
  id: number;
  title: string;
  content: string;
  userId: number;
}

interface CommentType {
  id: number;
  text: string;
  authorId: number;
}

const API_URL = "http://localhost:5000";

const Post: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!id) return;
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${API_URL}/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${API_URL}/posts/${id}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
  
    try {
      const response = await axios.post(`${API_URL}/posts/${id}/comments`, {
        text: newComment,
        authorId: 1, // Make sure this user exists in the database!
      });
  
      if (response.status === 201 || response.status === 200) {
        setNewComment("");
        fetchComments();
      }
    } catch (err) {
      console.error("❌ Error posting comment:", err);
      alert(`Error: ${err || "Something went wrong"}`);
    }
  };
  
  

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
          <p className="body">{post.content}</p>
        </article>
      ) : (
        <p className="loading">Loading or no post found...</p>
      )}

      <section className="comment-section">
        <h2>Comments</h2>
        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <img
                src={`https://i.pravatar.cc/50?u=${comment.authorId}`}
                alt="User Avatar"
              />
              <div className="comment-content">
                <p className="comment-author">User #{comment.authorId}</p>
                <p>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="comment-form">
          <textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button onClick={handleCommentSubmit}>Post Comment</button>
        </div>
      </section>
    </div>
  );
};

export default Post;
