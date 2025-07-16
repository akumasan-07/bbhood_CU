import React from 'react';

const StudentDashboard = ({ student }) => {
  return (
    <div>
      <h2>Student Dashboard</h2>
      <p>Welcome{student && student.username ? `, ${student.username}` : ''}!</p>
      <div>
        {/* Add student features here, e.g., attendance, profile, etc. */}
        <p>This is your dashboard. More features coming soon!</p>
      </div>
    </div>
  );
};

export default StudentDashboard; 