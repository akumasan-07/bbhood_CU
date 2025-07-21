import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StudentHeader from '../components/student-details/StudentHeader';
import AttendanceHistoryTable from '../components/student-details/AttendanceHistoryTable';
import MoodTrendCard from '../components/student-details/MoodTrendCard';
import FlaggedInstancesTable from '../components/student-details/FlaggedInstancesTable';
import InterventionsCard from '../components/student-details/InterventionsCard';
import '../components_css/TeacherDashboard.css';

const flagged = [
  { date: '2024-07-15', desc: 'Student appeared distressed during class' },
  { date: '2024-07-08', desc: 'Student showed signs of anxiety during exam' },
];

const interventions = [
  '2024-07-16',
  '2024-07-23',
];
const StudentReport = ({ setTeacher, studentId: propStudentId }) => {
  const params = useParams();
  const studentId = propStudentId || params.studentId;
  const [studentObj, setStudentObj] = useState(null);
  useEffect(() => {
    fetch(`/api/auth/student/${studentId}`)
      .then(res => res.json())
      .then(data => setStudentObj(data));
  }, [studentId]);
  const studentName = studentObj?.username || studentObj?.name || studentId;

  return (
    <div className="sd-root">
      <Navbar active="Reports" showLinks={true} currentRole="teacher" setTeacher={setTeacher} />
      <div className="sd-container">
        <div className="sd-header" style={{display: 'flex', alignItems: 'center', gap: 24, marginBottom: 0}}>
          <div className="sd-header-avatar" style={{minWidth: 64, minHeight: 64, fontSize: '2.2rem', background: '#e0c3fc', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700}}>
            {studentName ? studentName[0].toUpperCase() : 'S'}
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#181028', marginBottom: '0.5rem' }}>Student's Dashboard</h1>
            <div style={{ fontWeight: 700, fontSize: '1.5rem', color: '#7c19e5', marginBottom: '0.2rem' }}>
              {studentName || 'Student'}
              <span style={{ color: '#a259e6', marginLeft: 8 }}>— {studentObj?.classSection || '10A'}</span>
            </div>
            <div style={{ color: '#7c5fa3', fontSize: '1.25rem', marginTop: 8 }}>
              An overview of your attendance and check-ins.
            </div>
          </div>
        </div>
        <div className="sd-section-row">
          <div className="sd-section-col">
            <AttendanceHistoryTable attendance={studentObj?.attendance || []} />
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
};

export default StudentReport; 
