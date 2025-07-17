import React from 'react';
import { Line, Bar } from 'react-chartjs-2';

const moodLineDataWithShadow = (moodLineData) => ({
  ...moodLineData,
  datasets: moodLineData.datasets.map(ds => ({
    ...ds,
    backgroundColor: 'rgba(139,92,246,0.15)', // soft indigo shadow
    borderColor: '#a78bfa', // indigo-400, balanced
    pointBackgroundColor: '#c7bfff', // lighter indigo
    pointBorderColor: '#fff',
  })),
});

const pastelBarColors = [
  'rgba(191,219,254,0.9)', // blue-200
  'rgba(167,243,208,0.9)', // green-200
  'rgba(254,240,138,0.9)', // yellow-200
  'rgba(221,214,254,0.9)', // purple-200
];

const moodBarDataPastel = (moodBarData) => ({
  ...moodBarData,
  datasets: moodBarData.datasets.map(ds => ({
    ...ds,
    backgroundColor: pastelBarColors,
    borderRadius: 8,
  })),
});

// Simple Chart.js plugin for a single line shadow
const lineShadow = {
  id: 'lineShadow',
  beforeDatasetsDraw(chart) {
    const ctx = chart.ctx;
    chart.data.datasets.forEach((dataset, i) => {
      if (chart.isDatasetVisible(i) && dataset.type !== 'bar') {
        const meta = chart.getDatasetMeta(i);
        ctx.save();
        ctx.shadowColor = 'rgba(139,92,246,0.28)'; // indigo-500, moderate opacity
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 6;
        meta.dataset.draw(ctx);
        ctx.restore();
      }
    });
  },
};

const MoodTrends = ({ moodLineData, moodBarData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <div className="bg-white rounded-xl shadow p-6">
      <span className="font-semibold text-gray-700">Mood Score Over Time</span>
      <div className="flex items-center gap-2 mb-2 mt-1">
        <span className="text-2xl font-bold">4.1</span>
        <span className="text-gray-500">Last 7 Days</span>
      </div>
      <div className="h-48">
        <Line
          data={moodLineDataWithShadow(moodLineData)}
          options={{
            plugins: { legend: { display: false }, lineShadow: {} },
            scales: { y: { min: 0, max: 5, ticks: { stepSize: 1 } } },
            responsive: true,
            maintainAspectRatio: false,
          }}
          plugins={[lineShadow]}
        />
      </div>
    </div>
    <div className="bg-white rounded-xl shadow p-6">
      <span className="font-semibold text-gray-700">Mood Distribution by Class</span>
      <div className="flex items-center gap-2 mb-2 mt-1">
        <span className="text-2xl font-bold">4.3</span>
        <span className="text-gray-500">All Classes</span>
      </div>
      <div className="h-48">
        <Bar data={moodBarDataPastel(moodBarData)} options={{
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