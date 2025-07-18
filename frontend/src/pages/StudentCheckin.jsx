import React from 'react';
import '../components_css/TeacherDashboard.css';
import Navbar from '../components/Navbar';
import CheckinCard from '../components/student-checkin/CheckinCard';

<<<<<<< HEAD
const StudentCheckin = () => (
  <div className="attendance-checkin-bg">
    <Navbar active="Attendance" showLinks={true} currentRole="teacher" className="navbar-absolute" />
    <div className="attendance-checkin-card">
      <CheckinCard />
=======
const StudentCheckin = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-blue-100 to-yellow-100 text-[var(--text-primary)]">
      <Header />
      <div className="flex justify-center items-center min-h-[70vh]">
        <CheckinCard />
      </div>
>>>>>>> friend/partial
    </div>
  );
};

export default StudentCheckin; 