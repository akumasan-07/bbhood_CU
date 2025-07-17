import React from 'react';

const statusBadge = status => {
  if (status === 'Present') return <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">Present</span>;
  if (status === 'Late') return <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs font-semibold">Late</span>;
  if (status === 'Absent') return <span className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-xs font-semibold">Absent</span>;
  return <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-semibold">{status}</span>;
};

const moodColor = mood => {
  if (mood === 'Happy') return 'text-green-600 font-semibold';
  if (mood === 'Neutral') return 'text-gray-500 font-semibold';
  if (mood === 'Anxious') return 'text-yellow-600 font-semibold';
  return 'text-gray-400';
};

const AttendanceHistoryTable = ({ attendance }) => (
  <div className="flex-1">
    <div className="font-bold text-lg mb-4">Attendance History</div>
    <div className="rounded-xl border border-gray-200 bg-white overflow-x-auto h-80 flex flex-col justify-between">
      <table className="min-w-full text-left">
        <thead>
          <tr className="text-gray-400 text-sm">
            <th className="py-3 px-4 font-medium">DATE</th>
            <th className="py-3 px-4 font-medium">TIME</th>
            <th className="py-3 px-4 font-medium">STATUS</th>
            <th className="py-3 px-4 font-medium">MOOD</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {attendance.map((row, i) => (
            <tr key={i}>
              <td className="py-3 px-4 text-gray-700">{row.date}</td>
              <td className="py-3 px-4 text-gray-700">{row.time}</td>
              <td className="py-3 px-4">{statusBadge(row.status)}</td>
              <td className={`py-3 px-4 ${moodColor(row.mood)}`}>{row.mood}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AttendanceHistoryTable; 