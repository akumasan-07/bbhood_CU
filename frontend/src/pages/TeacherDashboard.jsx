import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import '../components_css/TeacherDashboard.css';
import TeacherHeader from '../components/teacher-dashboard/TeacherHeader';
import ClassSummaryCards from '../components/teacher-dashboard/ClassSummaryCards';
import StudentAttendanceTable from '../components/teacher-dashboard/StudentAttendanceTable';
import MoodDeviationsTable from '../components/teacher-dashboard/MoodDeviationsTable';
import { useNavigate } from 'react-router-dom';

function TeacherDashboard({ teacher, setTeacher, students, attendanceData, setAttendanceData }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Remove useEffect that fetches students

  console.log('TeacherDashboard students:', students);

  // Prepare attendance data for table
  const today = new Date().toISOString().slice(0, 10);

  // Update attendanceData in StudentAttendanceTable and pass to ClassSummaryCards

  // Example flagged students array (replace with real data as needed)
  // For demo: consider students with status 'Late' or 'Absent' today as flagged
  const flaggedStudents = attendanceData.filter(s => {
    if (!Array.isArray(s.attendance)) return false;
    return s.attendance.some(a => {
      const d = a.date ? new Date(a.date).toISOString().slice(0, 10) : '';
      return d === today && (a.status === 'Late' || a.status === 'Absent');
    });
  });
  const flaggedCount = flaggedStudents.length;

  return (
    <div className="tdb-root">
      <Navbar active="Dashboard" showLinks={true} currentRole="teacher" setTeacher={setTeacher} />
      <div className="tdb-main">
        <div className="tdb-main1">
          <div className="tdb-header">
            <h1>Teacher's Dashboard</h1>
            {teacher && (
              <div style={{fontSize:'1.2rem',color:'#7c19e5',fontWeight:600,marginTop:4}}>
                {teacher.username} &mdash; {teacher.classSection}
              </div>
            )}
            <p>An overview of your class's mood and attendance.</p>
          </div>
          <div className="tdb-content">
            <section>
              <h2>Class Summary</h2>
              <ClassSummaryCards students={attendanceData} flaggedCount={flaggedCount} />
            </section>
            <section>
              <h2>Student Attendance</h2>
              {loading ? <div>Loading students...</div> : (
                attendanceData.length > 0 ? (
                  <StudentAttendanceTable attendanceData={attendanceData} setAttendanceData={setAttendanceData} />
                ) : (
                  <div>No students found.</div>
                )
              )}
            </section>
            <section>
              <h2>Students with Notable Mood Deviations ({flaggedCount})</h2>
              <MoodDeviationsTable moodDeviations={flaggedStudents} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
