import React, { useEffect, useState } from "react";
import { FaDesktop, FaHeart, FaPlane, FaUtensils, FaFootballBall } from "react-icons/fa";
import { getCategories } from "../../api/categoriesApi";
import "./categoryList.scss";

interface Category {
  id: number;
  name: string;
}

const categoryIcons: { [key: string]: JSX.Element } = {
  Technology: <FaDesktop />,
  Health: <FaHeart />,
  Travel: <FaPlane />,
  Cooking: <FaUtensils />,
  Sports: <FaFootballBall />,
  Lifestyle: <FaHeart />,
};

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories.");
    }
  };

  return (
    <div className="categories-page">
      <section className="categories-header">
        <h1>Categories</h1>
        <p>Select a category to explore related posts.</p>
      </section>

      {error && <p className="error">{error}</p>}

      <section className="categories-list">
        <div className="category-grid">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category.id} className="category-card">
                <div className="icon">{categoryIcons[category.name] || <FaDesktop />}</div>
                <h3>{category.name}</h3>
              </div>
            ))
          ) : (
            <p>Loading categories...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryList;
