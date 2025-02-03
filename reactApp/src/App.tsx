import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/main';
import Post from './pages/Post/post';
import CategoryList from './pages/CategoryList/categoryList';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import './App.scss';

const App: React.FC = () => {
    return (
        <Router>
          <div className="app-container">
            <Nav />
            <div className="content">
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/categories" element={<CategoryList />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
    );
};

export default App;
