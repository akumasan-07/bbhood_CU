import React from 'react';

const SummaryCards = ({ summary }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    {summary.map((item, i) => (
      <div key={i} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
        <span className="text-gray-600 text-md font-medium">{item.title}</span>
        <span className="text-3xl font-bold">{item.value}</span>
        <span className={`font-semibold ${item.subColor}`}>{item.sub}</span>
      </div>
    ))}
  </div>
);

export default SummaryCards; 