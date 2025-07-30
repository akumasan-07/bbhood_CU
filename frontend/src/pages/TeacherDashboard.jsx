import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import TeacherHeader from '../components/teacher-dashboard/TeacherHeader';
import ClassSummaryCards from '../components/teacher-dashboard/ClassSummaryCards';
import StudentAttendanceTable from '../components/teacher-dashboard/StudentAttendanceTable';
import MoodDeviationsTable from '../components/teacher-dashboard/MoodDeviationsTable';
import { useNavigate } from 'react-router-dom';
import '../components_css/TeacherDashboard.css';

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

  // Prepare mood deviations for today: students with today's avg mood score < 3.5
  console.log('Calculating mood deviations for students:', attendanceData);
  
  const moodDeviations = attendanceData
    .map(student => {
      console.log('Checking student:', student.name, 'Total attendance:', student.totalAttendance, 'Attendance records:', student.attendance);
      
      if (!Array.isArray(student.attendance)) {
        console.log('Student has no attendance array:', student.name);
        return null;
      }
      
      // Get today's attendance records with moodScore
      const todayRecords = student.attendance.filter(a => {
        const d = a.date ? new Date(a.date).toISOString().slice(0, 10) : '';
        const hasMoodScore = typeof a.moodScore === 'number';
        console.log('Record date:', d, 'Today:', today, 'Has mood score:', hasMoodScore, 'Mood score:', a.moodScore);
        return d === today && hasMoodScore;
      });
      
      console.log('Today records with mood for', student.name, ':', todayRecords);
      
      // Skip if no mood data for today
      if (todayRecords.length === 0) {
        console.log('No mood data for today for student:', student.name);
        return null;
      }
      
      // Calculate average mood score for today
      const avgMoodScore = todayRecords.reduce((sum, a) => sum + (a.moodScore), 0) / todayRecords.length;
      console.log('Average mood score for', student.name, ':', avgMoodScore);
      
      // Only include students with mood score below 3.5
      if (avgMoodScore >= 3.5) {
        console.log('Student', student.name, 'has mood score >= 3.5, not adding to deviations');
        return null;
      }
      
      // Determine color based on mood score
      let changeColor = 'red';
      if (avgMoodScore >= 2.5) changeColor = 'yellow';
      
      // Format the time of the most recent record
      const lastRecord = todayRecords.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
      const lastUpdated = lastRecord ? new Date(lastRecord.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '-';
      
      console.log('Adding student to mood deviations:', student.name, 'with score:', avgMoodScore);
      
      return {
        name: student.name || student.username || student.studentID,
        mood: avgMoodScore.toFixed(2),
        change: avgMoodScore < 2.0 ? 'Needs urgent attention' : 'Below average',
        lastUpdated: lastUpdated,
        changeColor: changeColor,
        studentID: student.studentID
      };
    })
    .filter(Boolean);
    
  console.log('Final mood deviations list:', moodDeviations);

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
              <ClassSummaryCards students={attendanceData} moodDeviationCount={moodDeviations.length} />

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
              <h2>Students with Notable Mood Deviations ({moodDeviations.length})</h2>
              <MoodDeviationsTable moodDeviations={moodDeviations} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;


