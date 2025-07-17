import React from "react";
import TeacherHeader from '../components/teacher-dashboard/TeacherHeader';
import ClassSummaryCards from '../components/teacher-dashboard/ClassSummaryCards';
import StudentAttendanceTable from '../components/teacher-dashboard/StudentAttendanceTable';
import MoodDeviationsTable from '../components/teacher-dashboard/MoodDeviationsTable';

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
  return (
    <div className="relative flex min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <TeacherHeader />
        <main className="px-10 py-8 lg:px-20 xl:px-40">
          <div className="layout-content-container flex flex-col max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Teacher's Dashboard: Class 10A</h1>
              <p className="text-gray-500 mt-1">An overview of your class's mood and attendance.</p>
            </div>
            <ClassSummaryCards />
            <StudentAttendanceTable attendanceData={attendanceData} />
            <MoodDeviationsTable moodDeviations={moodDeviations} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default TeacherDashboard;
