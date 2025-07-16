import React from 'react';

const SearchBar = ({ search, setSearch }) => (
  <input
    type="text"
    placeholder="Search for a student..."
    value={search}
    onChange={e => setSearch(e.target.value)}
    className="border rounded-md px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-purple-300"
  />
);

export default SearchBar; 