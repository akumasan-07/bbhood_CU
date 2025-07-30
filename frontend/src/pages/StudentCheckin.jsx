import React from 'react';
import Navbar from '../components/Navbar';
import CheckinCard from '../components/student-checkin/CheckinCard';
import '../components_css/TeacherDashboard.css';

const StudentCheckin = () => (
  <div className="attendance-checkin-bg attendance-checkin-container">
    <Navbar active="Attendance" showLinks={true} currentRole="teacher" className="navbar-absolute" />
    <div className="attendance-checkin-card">
      <CheckinCard />
    </div>
  </div>
);

export default StudentCheckin;
