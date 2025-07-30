import React from 'react';
import { useNavigate } from 'react-router-dom';

const MoodDeviationsTable = ({ moodDeviations }) => {
  const navigate = useNavigate();

  const adjustedMood = (mood) => {
    const raw = parseFloat(mood);
    const adjusted = raw - 1;
    return adjusted < 1.3 ? 1.3 : adjusted.toFixed(2);
  };

  return (
    <div style={{ marginBottom: '2em' }}>
      <h2 className="tdb-header" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1em' }}>Students with Notable Mood Deviations</h2>
      <div className="tdb-support" style={{ padding: 0, background: '#fff', border: '1px solid #dbd0e7', borderRadius: 12 }}>
        <table className="tdb-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Adjusted Mood Score</th>
              <th>Change from Avg.</th>
              <th>Last Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {moodDeviations.map((row, idx) => (
              <tr
                key={idx}
                style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                onClick={() => navigate(`/teacher/student/${row.studentID}`)}

                onMouseOver={e => e.currentTarget.style.background = '#f5f3fa'}
                onMouseOut={e => e.currentTarget.style.background = ''}
              >
                <td style={{ fontWeight: 600, color: '#140e1b' }}>{row.name}</td>
                <td style={{ 
                  color: row.changeColor === 'red' ? '#e53935' : row.changeColor === 'yellow' ? '#b45309' : row.changeColor === 'green' ? '#059669' : '#140e1b', 
                  fontWeight: 600 
                }}>
                  {adjustedMood(row.mood)}
                </td>
                <td style={{ 
                  color: row.changeColor === 'red' ? '#e53935' : row.changeColor === 'green' ? '#059669' : '#140e1b', 
                  fontWeight: 600 
                }}>
                  {row.change}
                </td>
                <td style={{ color: '#888' }}>{row.lastUpdated}</td>
                <td style={{ textAlign: 'right', color: '#7c19e5', fontWeight: 600, textDecoration: 'underline' }}>View Details</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MoodDeviationsTable;
