import React from 'react';
import '../components_css/TeacherDashboard.css';

const SearchBar = ({ search, setSearch }) => (
  <div className="search-bar">
    <span className="search-icon" style={{ display: 'flex', alignItems: 'center', marginRight: 6 }}>
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#bda6e6" strokeWidth="2"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
    </span>
    <input
      type="text"
      value={search}
      onChange={e => setSearch(e.target.value)}
      placeholder="Search students..."
      className="search-bar-input"
    />
  </div>
);

export default SearchBar; 