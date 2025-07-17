import React from 'react';

const FlaggedStudentsTable = ({ flaggedStudents }) => (
  <div className="mb-2">
    <span className="text-2xl font-bold mb-4 block">Students Flagged for Emotional Distress</span>
    <div className="bg-white rounded-xl shadow p-3">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-gray-700 font-bold text-lg">
              <th className="min-w-[9rem] py-3 px-4 ">Student Name</th>
              <th className="py-3 px-4 ">Class</th>
              <th className="py-3 px-4 ">Mood Score</th>
              <th className="py-3 px-4 ">Last Updated</th>
              <th className="py-3 px-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {flaggedStudents.map((s, i) => (
              <tr key={i}>
                <td className="min-w-[9rem] py-3 px-4 font-semibold text-purple-800 truncate">{s.name}</td>
                <td className="py-3 px-4">{s.class}</td>
                <td className="py-3 px-4 text-red-500 font-bold">{s.score}</td>
                <td className="py-3 px-4">{s.updated}</td>
                <td className="py-3 px-4 text-right">
                  <a href="#" className="text-blue-500 hover:underline font-medium">View Report</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default FlaggedStudentsTable; 