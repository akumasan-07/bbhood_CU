import React, { useState } from 'react';

const statusOptions = [
  { label: 'All Statuses', value: '' },
  { label: 'Present', value: 'Present' },
  { label: 'Absent', value: 'Absent' },
  { label: 'Late', value: 'Late' },
];

const StudentAttendanceTable = ({ attendanceData }) => {
  const [statusFilter, setStatusFilter] = useState('');
  const filteredData = statusFilter
    ? attendanceData.filter(row => row.status === statusFilter)
    : attendanceData;

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-gray-900">Student Attendance</h2>
        <div className="flex items-center gap-2">
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)] text-sm"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="max-h-140 overflow-y-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Student Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Attendance %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold bg-${row.statusColor}-100 text-${row.statusColor}-800`}>
                      {row.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${row.statusColor === "red" ? "text-red-500" : row.statusColor === "yellow" ? "text-yellow-500" : "text-gray-500"}`}>{row.percent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceTable; 