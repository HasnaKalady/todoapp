import React from 'react';
import './Sidebar.css';

const categories = ['All', 'Work', 'Home', 'Uni', 'Family', 'Personal'];

function Sidebar({ filter, setFilter }) {
  return (
    <div className="sidebar">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`category-btn ${filter === cat ? 'active' : ''}`}
          onClick={() => setFilter(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
