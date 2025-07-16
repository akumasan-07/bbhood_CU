import React from 'react';
import jinmori from '../assets/jinmori.jfif';

const Header = () => (
  <header className="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 bg-purple-300 rounded-md" />
      <span className="font-bold text-2xl">EduMind Analytics</span>
    </div>
    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
      <img src={jinmori} alt="Jin Mori" className="w-full h-full object-cover" />
    </div>
  </header>
);

export default Header; 