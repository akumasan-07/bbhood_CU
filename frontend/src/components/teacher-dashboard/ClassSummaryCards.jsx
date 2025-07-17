import React from 'react';

const ClassSummaryCards = () => (
  <div className="mb-8">
    <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-gray-900 mb-4">Class Summary</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="flex flex-col gap-2 rounded-2xl p-6 border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
        <p className="text-gray-600 text-sm font-medium leading-normal">Class Attendance</p>
        <p className="text-gray-900 tracking-tight text-3xl font-bold leading-tight">92%</p>
        <p className="text-red-600 text-sm font-medium leading-normal flex items-center gap-1">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.47 11.53a.75.75 0 1 1 1.06-1.06l3.22 3.22V3.75A.75.75 0 0 1 10 3z" fillRule="evenodd"></path></svg>
          <span>-3% from last week</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-2xl p-6 border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
        <p className="text-gray-600 text-sm font-medium leading-normal">Average Mood Score</p>
        <p className="text-gray-900 tracking-tight text-3xl font-bold leading-tight">3.8/5</p>
        <p className="text-green-600 text-sm font-medium leading-normal flex items-center gap-1">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.612L6.03 8.84a.75.75 0 1 1-1.06-1.06l4.25-4.25a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10.75 5.612V16.25A.75.75 0 0 1 10 17z" fillRule="evenodd"></path></svg>
          <span>+0.2 from last week</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-2xl p-6 border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
        <p className="text-gray-600 text-sm font-medium leading-normal">Notable Mood Deviations</p>
        <p className="text-gray-900 tracking-tight text-3xl font-bold leading-tight">3</p>
        <p className="text-gray-500 text-sm font-medium leading-normal flex items-center gap-1">
          <span>students flagged today</span>
        </p>
      </div>
    </div>
  </div>
);

export default ClassSummaryCards; 