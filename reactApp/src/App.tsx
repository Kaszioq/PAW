import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/main';
import Blog from './pages/Blog/blog';
import CategoryList from './pages/CategoryList/categoryList';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/categories" element={<CategoryList />} />
            </Routes>
        </Router>
    );
};

export default App;
