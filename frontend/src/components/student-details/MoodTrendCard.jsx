import React from 'react';

const MoodTrendCard = () => (
  <div className="w-full md:w-80 flex-shrink-0">
    <div className="font-bold text-lg mb-4">Mood Trend</div>
    <div className="rounded-xl border border-gray-200 bg-white p-6 h-80 flex flex-col justify-between">
      <div className="mb-2 text-sm text-gray-500">Average Mood: <span className="text-green-600 font-bold">Positive</span></div>
      <div className="mb-2 text-xs text-gray-500 flex items-center gap-1">Last 30 Days <span className="text-green-600 font-bold text-sm">↑ +5%</span></div>
      <svg viewBox="0 0 120 48" fill="none" className="w-full h-full">
        <path d="M0,40 Q10,10 20,30 T40,25 T60,40 T80,10 T100,45 T120,20" stroke="#8b5cf6" strokeWidth="2" fill="none" />
      </svg>
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
      </div>
    </div>
  </div>
);

export default MoodTrendCard; 