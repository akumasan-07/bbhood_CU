import React from 'react';

const MoodDeviationsTable = ({ moodDeviations }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-gray-900 mb-4">Students with Notable Mood Deviations</h2>
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Student Name</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Current Mood Score</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Change from Avg.</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Last Updated</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {moodDeviations.map((row, idx) => (
            <tr key={idx}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <a className="text-[var(--primary-500)] hover:text-[var(--primary-600)] font-semibold" href={row.link}>{row.name}</a>
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${row.changeColor === "red" ? "text-red-500" : row.changeColor === "yellow" ? "text-yellow-500" : row.changeColor === "green" ? "text-yellow-500" : ""} font-semibold`}>{row.mood}</td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${row.changeColor === "red" ? "text-red-500" : row.changeColor === "green" ? "text-green-500" : ""}`}>{row.change}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.lastUpdated}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a className="text-[var(--primary-500)] hover:text-[var(--primary-600)] font-semibold" href={row.link}>View Details</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default MoodDeviationsTable; 