import React from 'react';
import Navbar from '../components/Navbar';
import '../components_css/TeacherDashboard.css';
import StudentHeader from '../components/student-details/StudentHeader';
import AttendanceHistoryTable from '../components/student-details/AttendanceHistoryTable';
import MoodTrendCard from '../components/student-details/MoodTrendCard';
import FlaggedInstancesTable from '../components/student-details/FlaggedInstancesTable';
import InterventionsCard from '../components/student-details/InterventionsCard';

const attendance = [
  { date: '2024-07-20', time: '9:00 AM', status: 'Present', mood: 'Happy' },
  { date: '2024-07-19', time: '9:05 AM', status: 'Present', mood: 'Neutral' },
  { date: '2024-07-18', time: '9:00 AM', status: 'Present', mood: 'Happy' },
  { date: '2024-07-17', time: '9:15 AM', status: 'Late', mood: 'Anxious' },
  { date: '2024-07-16', time: '-', status: 'Absent', mood: '-' },
];

const flagged = [
  { date: '2024-07-15', desc: 'Student appeared distressed during class' },
  { date: '2024-07-08', desc: 'Student showed signs of anxiety during exam' },
];

const interventions = [
  '2024-07-16',
  '2024-07-23',
];

const StudentDetails = ({ setTeacher, studentId }) => (
  <div className="sd-root">
    <Navbar active="Reports" showLinks={true} currentRole="teacher" setTeacher={setTeacher} />
    <div className="sd-container">
      <div className="sd-header">
        <StudentHeader name={studentId ? `Student ${studentId}` : "Anika Sharma"} className="10A" />
      </div>
      <div className="sd-section-row">
        <div className="sd-section-col">
          <AttendanceHistoryTable attendance={attendance} />
        </div>
        <div className="sd-section-col">
          <MoodTrendCard />
        </div>
      </div>
      <div className="sd-section-row">
        <div className="sd-section-col">
          <FlaggedInstancesTable flagged={flagged} />
        </div>
        <div className="sd-section-col">
          <InterventionsCard interventions={interventions} />
        </div>
      </div>
    </div>
  </div>
);

export default StudentDetails; 