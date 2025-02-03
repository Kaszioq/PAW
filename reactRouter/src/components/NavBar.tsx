import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav style={{ padding: "1rem", background: "#f3f3f3", marginBottom: "2rem" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
      <Link to="/about" style={{ marginRight: "1rem" }}>About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
};

export default NavBar;
