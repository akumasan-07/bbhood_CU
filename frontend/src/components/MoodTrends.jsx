import React from 'react';
import { Line, Bar } from 'react-chartjs-2';

const MoodTrends = ({ moodLineData, moodBarData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <div className="bg-white rounded-xl shadow p-6">
      <span className="font-semibold text-gray-700">Mood Score Over Time</span>
      <div className="flex items-center gap-2 mb-2 mt-1">
        <span className="text-2xl font-bold">4.1</span>
        <span className="text-gray-500">Last 7 Days</span>
      </div>
      <div className="h-48">
        <Line data={moodLineData} options={{
          plugins: { legend: { display: false } },
          scales: { y: { min: 0, max: 5, ticks: { stepSize: 1 } } },
          responsive: true,
          maintainAspectRatio: false,
        }} />
      </div>
    </div>
    <div className="bg-white rounded-xl shadow p-6">
      <span className="font-semibold text-gray-700">Mood Distribution by Class</span>
      <div className="flex items-center gap-2 mb-2 mt-1">
        <span className="text-2xl font-bold">4.3</span>
        <span className="text-gray-500">All Classes</span>
      </div>
      <div className="h-48">
        <Bar data={moodBarData} options={{
          plugins: { legend: { display: false } },
          scales: { y: { min: 0, max: 5, ticks: { stepSize: 1 } } },
          responsive: true,
          maintainAspectRatio: false,
        }} />
      </div>
    </div>
  </div>
);

export default MoodTrends; 