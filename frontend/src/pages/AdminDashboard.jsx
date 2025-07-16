import { useState } from 'react';
import Header from '../components/Header';
import SummaryCards from '../components/SummaryCards';
import SearchBar from '../components/SearchBar';
import MoodTrends from '../components/MoodTrends';
import FlaggedStudentsTable from '../components/FlaggedStudentsTable';

const summary = [
  {
    title: 'Total Attendance',
    value: '95%',
    sub: '+2% from last week',
    subColor: 'text-green-500',
  },
  {
    title: 'Average Mood Score',
    value: '4.2/5',
    sub: '-0.1 from last week',
    subColor: 'text-red-500',
  },
  {
    title: 'Students Flagged',
    value: '12',
    sub: '+5 new alerts today',
    subColor: 'text-yellow-500',
  },
];

const moodLineData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Mood Score',
      data: [4.0, 4.2, 4.1, 3.9, 4.5, 3.7, 4.3],
      borderColor: '#a78bfa',
      backgroundColor: 'rgba(139,92,246,0.15)',
      tension: 0.4,
      fill: true,
    },
  ],
};

const moodBarData = {
  labels: ['Class A', 'Class B', 'Class C', 'Class D'],
  datasets: [
    {
      label: 'Mood Score',
      data: [4.0, 3.8, 4.6, 4.1],
      backgroundColor: [
        'rgba(191,219,254,0.9)',
        'rgba(167,243,208,0.9)',
        'rgba(254,240,138,0.9)',
        'rgba(221,214,254,0.9)',
      ],
      borderRadius: 8,
    },
  ],
};

const flaggedStudents = [
  { name: 'Priya Sharma', class: 'Class 10', score: 2.5, updated: '2024-07-26 10:00 AM' },
  { name: 'Arjun Verma', class: 'Class 11', score: 2.8, updated: '2024-07-26 11:30 AM' },
  { name: 'Divya Patel', class: 'Class 9', score: 2.2, updated: '2024-07-26 09:45 AM' },
  { name: 'Rohan Singh', class: 'Class 12', score: 2.9, updated: '2024-07-26 12:15 PM' },
  { name: 'Anika Kapoor', class: 'Class 10', score: 2.7, updated: '2024-07-26 08:30 AM' },
];

function AdminDashboard() {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-1">Attendance & Mood Dashboard</h1>
        <p className="text-gray-500 mb-6">An overview of student well-being and engagement.</p>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <span className="text-2xl font-bold">Student Reports</span>
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        {/* Summary Section */}
        <div className="mb-2">
          <span className="text-2xl font-bold mb-4 block">Summary</span>
          <SummaryCards summary={summary} />
        </div>
        {/* Mood Trends Section */}
        <div className="mb-2">
          <span className="text-2xl font-bold mb-4 block">Mood Trends</span>
          <MoodTrends moodLineData={moodLineData} moodBarData={moodBarData} />
        </div>
        {/* Students Flagged Section (heading is in the component, so update there too) */}
        <FlaggedStudentsTable flaggedStudents={flaggedStudents} />
      </main>
    </div>
  );
}

export default AdminDashboard; 