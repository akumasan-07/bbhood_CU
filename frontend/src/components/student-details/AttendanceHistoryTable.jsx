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

const AttendanceHistoryTable = ({ attendance }) => {
  // If attendance is not an array, fallback to empty
  const records = Array.isArray(attendance) ? attendance : [];
  console.log('AttendanceHistoryTable records:', records);
  return (
    <div className="sd-card">
      <h3 className="summary-card-title">Attendance History</h3>
      <table className="sd-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Mood</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr><td colSpan={4}>No attendance records found.</td></tr>
          ) : records.map((row, idx) => {
            const d = row.date ? new Date(row.date) : null;
            const date = d && !isNaN(d) ? d.toISOString().slice(0, 10) : '-';
            const time = d && !isNaN(d) ? (row.time || d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })) : '-';
            const status = row.status || '-';
            const mood = row.mood || '-';
            return (
              <tr key={row._id || idx}>
                <td>{date}</td>
                <td>{time}</td>
                <td>
                  <span className={
                    status === 'Present' ? 'sd-status-present' :
                    status === 'Late' ? 'sd-status-late' :
                    status === 'Absent' ? 'sd-status-absent' : ''
                  }>{status}</span>
                </td>
                <td>{mood}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceHistoryTable; 