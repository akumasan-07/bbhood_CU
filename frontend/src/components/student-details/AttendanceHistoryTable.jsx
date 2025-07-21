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
            // Format date and time
            let date = '--', time = '--', status = '--';
            if (row.date) {
              const d = new Date(row.date);
              if (!isNaN(d)) {
                date = d.toISOString().slice(0, 10);
                time = row.time || d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
              }
            }
            if (row.status) status = row.status;
            return (
              <tr key={idx}>
                <td>{date}</td>
                <td>{time}</td>
                <td>
                  <span className={
                    status === 'Present' ? 'sd-status-present' :
                    status === 'Late' ? 'sd-status-late' :
                    status === 'Absent' ? 'sd-status-absent' : ''
                  }>{status}</span>
                </td>
                <td>-</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceHistoryTable; 