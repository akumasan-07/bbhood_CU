import React from 'react';
import '../components_css/TeacherDashboard.css';
import Navbar from '../components/Navbar';
import CheckinCard from '../components/student-checkin/CheckinCard';

const StudentCheckin = () => (
  <div className="attendance-checkin-bg">
    <Navbar active="Attendance" showLinks={true} currentRole="teacher" className="navbar-absolute" />
    <div className="attendance-checkin-card">
      <CheckinCard />
    </div>
  </div>
);

export default StudentCheckin; 