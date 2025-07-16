import React from 'react';

const SearchBar = ({ search, setSearch }) => (
  <div className="relative w-full md:w-80">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      {/* Heroicons search icon */}
      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </span>
    <input
      type="text"
      placeholder="Search for a student..."
      value={search}
      onChange={e => setSearch(e.target.value)}
      className="border-2 border-gray-300 rounded-full pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
    />
  </div>
);

export default SearchBar; 