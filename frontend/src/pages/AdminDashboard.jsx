import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SummaryCards from '../components/SummaryCards';
import MoodTrends from '../components/MoodTrends';
import '../components_css/TeacherDashboard.css';

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
  labels: ['IT','CSE','DSA','ECE'],
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

function AdminDashboard() {
  const [flaggedStudents, setFlaggedStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchFlagged = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/auth/flagged-students');
        const data = await res.json();

        setFlaggedStudents(data);

        // Calculate attendance (based on % of flagged out of 100 students)
        const totalStudents = 100; // You can make this dynamic if needed
        const flaggedCount = data.length;
        const attendance = (((totalStudents - flaggedCount) / totalStudents) * 100).toFixed(2) + '%';

        // Calculate average mood after subtracting 1 from each
        const adjustedMoods = data.map(s => (s.moodAvg - 1));
        let moodAvg = adjustedMoods.length > 0
          ? (adjustedMoods.reduce((sum, m) => sum + m, 0) / adjustedMoods.length)
          : 0;
        // If moodAvg is negative, add 2 to it
        if (moodAvg < 0) moodAvg += 2;
        moodAvg = moodAvg.toFixed(2);

        setSummary([
          {
            title: 'Total Attendance',
            value: attendance,
            sub: `${flaggedCount} students flagged`,
            subColor: 'text-yellow-500',
          },
          {
            title: 'Average Mood Score',
            value: `${moodAvg}/5`,
            sub: `based on ${flaggedCount} students`,
            subColor: 'text-blue-500',
          },
          {
            title: 'Students Flagged',
            value: flaggedCount,
            sub: 'alerts today',
            subColor: 'text-red-500',
          },
        ]);

      } catch (err) {
        console.error('Error fetching flagged students:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFlagged();
  }, []);

  return (
    <div className="admin-root">
      <Navbar active="Dashboard" currentRole="counselor" showLinks={true} />
      <main className="admin-main">
        <h1 className="admin-title">Attendance & Mood Dashboard</h1>
        <p className="admin-subtitle">An overview of student well-being and engagement.</p>

        <div className="admin-reports-row">
          <span className="admin-reports-title">Student Reports</span>
        </div>

        {/* Summary Section */}
        <div className="admin-section">
          <span className="admin-section-title">Summary</span>
          <SummaryCards summary={summary} />
        </div>

        {/* Mood Trends Section */}
        <div className="admin-section">
          <span className="admin-section-title">Mood Trends</span>
          <MoodTrends moodLineData={moodLineData} moodBarData={moodBarData} />
        </div>

        {/* Flagged Students Table */}
        <div className="flagged-section">
          <span className="flagged-section-title">Flagged Students</span>
          {loading ? (
            <p>Loading flagged students...</p>
          ) : flaggedStudents.length === 0 ? (
            <p>No students flagged with mood score below 3.5</p>
          ) : (
            <div className="flagged-table-container">
              <table className="flagged-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Mood Score</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {flaggedStudents.map((student) => (
                    <tr key={student._id}>
                      <td>{student.username}</td>
                      <td>{student.classSection}</td>
                      <td>{(student.moodAvg-1).toFixed(2)}</td>
                      <td>{new Date(student.updatedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
