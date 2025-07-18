import React from 'react';

const MoodTrendCard = () => (
  <div className="sd-moodtrend-card">
    <div className="font-bold text-lg mb-4">Mood Trend</div>
    <div>
      <div className="mb-2 text-sm" style={{color:'#888'}}>Average Mood: <span className="sd-mood-happy" style={{fontWeight:'bold'}}>Positive</span></div>
      <div className="mb-2 text-xs" style={{color:'#888'}}>Last 30 Days <span className="sd-mood-happy" style={{fontWeight:'bold', fontSize:'1rem'}}>&uarr; +5%</span></div>
      <svg viewBox="0 0 120 48" fill="none" className="w-full h-full">
        <path d="M0,40 Q10,10 20,30 T40,25 T60,40 T80,10 T100,45 T120,20" stroke="#8b5cf6" strokeWidth="2" fill="none" />
      </svg>
      <div className="flex justify-between text-xs" style={{color:'#bbb', marginTop:8}}>
        <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
      </div>
    </div>
  </div>
);

export default MoodTrendCard; 