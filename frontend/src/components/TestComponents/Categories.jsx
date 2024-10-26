import React from 'react';

const Categories = ({ categories }) => {
  // Ensure categories is always an array
  const categoryList = Array.isArray(categories) ? categories : [];

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categoryList.map((category, index) => (
          <li key={index}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
