import React from 'react';

const Header = () => (
  <header className="flex items-center justify-between px-8 py-4 border-b bg-white">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 bg-purple-300 rounded-md" />
      <span className="font-bold text-lg">EduMind Analytics</span>
    </div>
    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
      {/* Placeholder avatar */}
    </div>
  </header>
);

export default Header; 