import React from "react";
import "./Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <p>&copy; {new Date().getFullYear()} BlogApp. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
