import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaThList } from "react-icons/fa";
import "./Nav.scss";

const Nav: React.FC = () => {
  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <Link to="/" className="logo-link">
          MyBlog
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/categories">
            <FaThList /> Categories
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
