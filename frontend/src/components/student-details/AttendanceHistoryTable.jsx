import React from 'react';

const statusBadge = status => {
  if (status === 'Present') return <span className="sd-status-present">Present</span>;
  if (status === 'Late') return <span className="sd-status-late">Late</span>;
  if (status === 'Absent') return <span className="sd-status-absent">Absent</span>;
  return <span className="sd-status-neutral">{status}</span>;
};

const moodColor = mood => {
  if (mood === 'Happy') return 'sd-mood-happy';
  if (mood === 'Neutral') return 'sd-mood-neutral';
  if (mood === 'Anxious') return 'sd-mood-anxious';
  return '';
};

const AttendanceHistoryTable = ({ attendance }) => (
  <div className="sd-card">
    <div className="font-bold text-lg mb-4">Attendance History</div>
    <div style={{overflowX: 'auto', maxHeight: 320}}>
      <table className="sd-table">
        <thead>
          <tr>
            <th>DATE</th>
            <th>TIME</th>
            <th>STATUS</th>
            <th>MOOD</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((row, i) => (
            <tr key={i}>
              <td>{row.date}</td>
              <td>{row.time}</td>
              <td>{statusBadge(row.status)}</td>
              <td className={moodColor(row.mood)}>{row.mood}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AttendanceHistoryTable; 