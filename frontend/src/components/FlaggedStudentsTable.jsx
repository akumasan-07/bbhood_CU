import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components_css/TeacherDashboard.css';

const FlaggedStudentsTable = ({ flaggedStudents }) => {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: 24 }}>
      <h2 style={{ fontWeight: 800, fontSize: '2rem', marginBottom: 12 }}>Students Flagged for Emotional Distress</h2>
      <table className="flagged-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Class</th>
            <th>Mood Score</th>
            <th>Last Updated</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {flaggedStudents.map((row, idx) => (
            <tr
              key={idx}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/counselor/student/${row.studentId || row.id}`)}
            >
              <td style={{ color: '#7c19e5', fontWeight: 700 }}>{row.name}</td>
              <td>{row.class}</td>
              <td style={{ color: '#e53935', fontWeight: 700 }}>{row.score}</td>
              <td>{row.updated}</td>
              <td>
                <a
                  href="#"
                  style={{ color: '#3490ec', fontWeight: 600, textDecoration: 'underline' }}
                  onClick={e => { e.stopPropagation(); navigate(`/counselor/student/${row.studentId || row.id}`); }}
                >
                  View Report
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlaggedStudentsTable; 