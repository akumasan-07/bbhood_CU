import React from 'react';

const MoodDeviationsTable = ({ moodDeviations }) => (
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
          {moodDeviations.map((row, idx) => (
            <tr key={idx}>
              <td style={{ fontWeight: 600, color: '#140e1b' }}>{row.name}</td>
              <td style={{ color: row.changeColor === 'red' ? '#e53935' : row.changeColor === 'yellow' ? '#b45309' : row.changeColor === 'green' ? '#059669' : '#140e1b', fontWeight: 600 }}>{row.mood}</td>
              <td style={{ color: row.changeColor === 'red' ? '#e53935' : row.changeColor === 'green' ? '#059669' : '#140e1b', fontWeight: 600 }}>{row.change}</td>
              <td style={{ color: '#888' }}>{row.lastUpdated}</td>
              <td style={{ textAlign: 'right' }}>
                <a style={{ color: '#7c19e5', fontWeight: 600, textDecoration: 'none' }} href={row.link}>View Details</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default MoodDeviationsTable; 