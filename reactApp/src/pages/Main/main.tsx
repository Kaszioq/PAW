import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "./Main.scss";

const Main: React.FC = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to MyBlog</h1>
          <p className="subtitle">
            Discover the latest posts, learn new things, and share your thoughts!
          </p>
          <button className="hero-button">
            <Link to="/categories"> Get Started <FaArrowRight /> </Link>
          </button>
        </div>
      </section>

      <section className="featured-posts">
        <h2>Featured Posts</h2>
        <div className="posts-grid">
          <article className="post-card">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Post Cover"
              className="post-image"
            />
            <div className="post-content">
              <h3>Building a React App</h3>
              <p>
                Learn the basics of building a modern web application using React,
                from setup to deployment.
              </p>
            </div>
          </article>

          <article className="post-card">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Post Cover"
              className="post-image"
            />
            <div className="post-content">
              <h3>Healthy Lifestyle Tips</h3>
              <p>
                Explore how to maintain a balanced lifestyle with nutrition, exercise,
                and mindfulness.
              </p>
            </div>
          </article>

          <article className="post-card">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Post Cover"
              className="post-image"
            />
            <div className="post-content">
              <h3>Amazing Travel Destinations</h3>
              <p>
                Journey to the most beautiful places in the world and get travel tips
                for your next vacation.
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Main;
