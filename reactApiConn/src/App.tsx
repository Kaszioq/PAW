import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Posts from "./pages/Posts/posts";
import Post from "./pages/Post/post";


const App: React.FC = () => {
  return (
      <Router>
          <Routes>
              <Route path="/posts" element={<Posts />} />
              <Route path="/post/:id" element={<Post />} />
          </Routes>
      </Router>
  );
};


export default App;
