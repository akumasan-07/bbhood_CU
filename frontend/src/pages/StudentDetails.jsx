import React from 'react';
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

const StudentDetails = () => (
  <div className="min-h-screen bg-[#faf7fd] flex flex-col items-center py-10">
    <div className="w-full max-w-5xl">
      <StudentHeader name="Anika Sharma" className="10A" />
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <AttendanceHistoryTable attendance={attendance} />
        <MoodTrendCard />
      </div>
      <FlaggedInstancesTable flagged={flagged} />
      <InterventionsCard interventions={interventions} />
    </div>
  </div>
);

export default StudentDetails; 