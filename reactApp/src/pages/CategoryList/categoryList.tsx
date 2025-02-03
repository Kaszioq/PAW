import React from "react";
import { FaDesktop, FaHeart, FaPlane, FaUtensils, FaFootballBall } from "react-icons/fa";
import "./categoryList.scss";

const CategoryList: React.FC = () => {
  return (
    <div className="categories-page">
      <section className="categories-header">
        <h1>Categories</h1>
        <p>Select a category to explore related posts.</p>
      </section>

      <section className="categories-list">
        <ul>
          <li>
            <FaDesktop /> Technology
          </li>
          <li>
            <FaHeart /> Health
          </li>
          <li>
            <FaPlane /> Travel
          </li>
          <li>
            <FaUtensils /> Cooking
          </li>
          <li>
            <FaFootballBall /> Sports
          </li>
        </ul>
      </section>
    </div>
  );
};

export default CategoryList;
