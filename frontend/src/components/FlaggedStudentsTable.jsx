import React from 'react';

const FlaggedStudentsTable = ({ flaggedStudents }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <span className="font-semibold text-lg mb-4 block">Students Flagged for Emotional Distress</span>
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr className="text-gray-500 text-sm">
            <th className="py-2 px-4 font-medium">Student Name</th>
            <th className="py-2 px-4 font-medium">Class</th>
            <th className="py-2 px-4 font-medium">Mood Score</th>
            <th className="py-2 px-4 font-medium">Last Updated</th>
            <th className="py-2 px-4 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {flaggedStudents.map((s, i) => (
            <tr key={i} className="border-t">
              <td className="py-2 px-4 font-semibold text-purple-700">{s.name}</td>
              <td className="py-2 px-4">{s.class}</td>
              <td className="py-2 px-4 text-red-500 font-bold">{s.score}</td>
              <td className="py-2 px-4">{s.updated}</td>
              <td className="py-2 px-4">
                <a href="#" className="text-blue-500 hover:underline font-medium">View Report</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default FlaggedStudentsTable; 