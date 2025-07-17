import React, { useState } from "react";
import Navbar from '../components/Navbar';
import '../components_css/TeacherDashboard.css';
import TeacherHeader from '../components/teacher-dashboard/TeacherHeader';
import ClassSummaryCards from '../components/teacher-dashboard/ClassSummaryCards';
import StudentAttendanceTable from '../components/teacher-dashboard/StudentAttendanceTable';
import MoodDeviationsTable from '../components/teacher-dashboard/MoodDeviationsTable';
import StudentCheckin from './StudentCheckin';

const attendanceData = [
  {
    name: "Aditi Sharma",
    date: "2024-07-26",
    status: "Present",
    percent: "98%",
    statusColor: "green",
  },
  {
    name: "Aarav Patel",
    date: "2024-07-26",
    status: "Present",
    percent: "95%",
    statusColor: "green",
  },
  {
    name: "Diya Singh",
    date: "2024-07-26",
    status: "Absent",
    percent: "85%",
    statusColor: "red",
  },
  {
    name: "Ishaan Gupta",
    date: "2024-07-26",
    status: "Present",
    percent: "100%",
    statusColor: "green",
  },
  {
    name: "Kavya Reddy",
    date: "2024-07-26",
    status: "Present",
    percent: "97%",
    statusColor: "green",
  },
  {
    name: "Rohan Kumar",
    date: "2024-07-26",
    status: "Late",
    percent: "91%",
    statusColor: "yellow",
  },
  {
    name: "Aditi Sharma",
    date: "2024-07-26",
    status: "Present",
    percent: "98%",
    statusColor: "green",
  },
  {
    name: "Aarav Patel",
    date: "2024-07-26",
    status: "Present",
    percent: "95%",
    statusColor: "green",
  },
];

const moodDeviations = [
  {
    name: "Priya Sharma",
    mood: "2.5",
    change: "-1.3",
    changeColor: "red",
    lastUpdated: "2024-07-26 10:00 AM",
    link: "#",
  },
  {
    name: "Anika Kapoor",
    mood: "2.7",
    change: "-1.1",
    changeColor: "red",
    lastUpdated: "2024-07-26 08:30 AM",
    link: "#",
  },
  {
    name: "Aryan Kumar",
    mood: "4.9",
    change: "+1.1",
    changeColor: "green",
    lastUpdated: "2024-07-26 11:15 AM",
    link: "#",
  },
];

function TeacherDashboard() {
  const [section, setSection] = useState('Dashboard');
  return (
    <div className="tdb-root">
      <Navbar active={section} showLinks={true} currentRole="teacher" onNavClick={setSection} />
      <div className="tdb-main">
        {section === 'Attendance' ? (
          <StudentCheckin />
        ) : (
          <>
            <div className="tdb-header">
              <h1>Teacher's Dashboard: Class 10A</h1>
              <p>An overview of your class's mood and attendance.</p>
            </div>
            <div className="tdb-content">
              <section>
                <h2>Class Summary</h2>
                <ClassSummaryCards />
              </section>
              <section>
                <h2>Student Attendance</h2>
                <StudentAttendanceTable attendanceData={attendanceData} />
              </section>
              <section>
                <h2>Students with Notable Mood Deviations</h2>
                <MoodDeviationsTable moodDeviations={moodDeviations} />
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;
