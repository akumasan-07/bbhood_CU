import React from 'react';
import { useNavigate } from 'react-router-dom';

const MoodDeviationsTable = ({ moodDeviations }) => {
  const navigate = useNavigate();
  return (
    <div style={{ marginBottom: '2em' }}>
      <h2 className="tdb-header" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1em' }}>Students with Notable Mood Deviations</h2>
      <div className="tdb-support" style={{ padding: 0, background: '#fff', border: '1px solid #dbd0e7', borderRadius: 12 }}>
        <table className="tdb-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Current Mood Score</th>
              <th>Change from Avg.</th>
              <th>Last Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {moodDeviations.map((row, idx) => {
              console.log('Student row:', row);
              // Find latest attendance record
              let latest = null;
              if (Array.isArray(row.attendance) && row.attendance.length > 0) {
                latest = row.attendance.reduce((a, b) => new Date(a.date) > new Date(b.date) ? a : b);
              }
              // Calculate average mood score
              let avgMoodScore = 0;
              if (Array.isArray(row.attendance) && row.attendance.length > 0) {
                const scores = row.attendance.map(a => typeof a.moodScore === 'number' ? a.moodScore : 0);
                if (scores.length > 0) {
                  avgMoodScore = scores.reduce((a, b) => a + b, 0) / scores.length;
                }
              }
              const currentMoodScore = latest && typeof latest.moodScore === 'number' ? latest.moodScore : 'N/A';
              const changeFromAvg = latest && typeof latest.moodScore === 'number' ? (latest.moodScore - avgMoodScore).toFixed(2) : 'N/A';
              const lastUpdated = latest && latest.date ? new Date(latest.date).toLocaleString() : 'N/A';
              return (
                <tr
                  key={idx}
                  style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                  onClick={() => navigate(`/teacher/student/${row.studentID}`)}
                  onMouseOver={e => e.currentTarget.style.background = '#f5f3fa'}
                  onMouseOut={e => e.currentTarget.style.background = ''}
                >
                  <td style={{ fontWeight: 600, color: '#140e1b' }}>{row.name}</td>
                  <td>{currentMoodScore}</td>
                  <td>{changeFromAvg}</td>
                  <td>{lastUpdated}</td>
                  <td style={{ textAlign: 'right', color: '#7c19e5', fontWeight: 600, textDecoration: 'underline' }}>View Details</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MoodDeviationsTable; 