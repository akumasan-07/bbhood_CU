import React from 'react';

const Header = () => (
  <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
    <div className="flex items-center gap-2">
      <span className="inline-block w-6 h-6 rounded-full border-2 border-purple-500 flex items-center justify-center">
        <span className="block w-3 h-3 bg-purple-500 rounded-full"></span>
      </span>
      <span className="font-bold text-xl">Attendance Page</span>
    </div>
    <div className="flex items-center">
      <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="avatar" className="w-9 h-9 rounded-full object-cover ml-4" />
    </div>
  </nav>
);

export default Header; 