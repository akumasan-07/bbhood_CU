// import { useState } from 'react';
// import Navbar from '../components/Navbar';
// import SummaryCards from '../components/SummaryCards';
// import MoodTrends from '../components/MoodTrends';
// import FlaggedStudentsTable from '../components/FlaggedStudentsTable';
// import '../components_css/TeacherDashboard.css';

// const summary = [
//   {
//     title: 'Total Attendance',
//     value: '95%',
//     sub: '+2% from last week',
//     subColor: 'text-green-500',
//   },
//   {
//     title: 'Average Mood Score',
//     value: '4.2/5',
//     sub: '-0.1 from last week',
//     subColor: 'text-red-500',
//   },
//   {
//     title: 'Students Flagged',
//     value: '12',
//     sub: '+5 new alerts today',
//     subColor: 'text-yellow-500',
//   },
// ];

// const moodLineData = {
//   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//   datasets: [
//     {
//       label: 'Mood Score',
//       data: [4.0, 4.2, 4.1, 3.9, 4.5, 3.7, 4.3],
//       borderColor: '#a78bfa',
//       backgroundColor: 'rgba(139,92,246,0.15)',
//       tension: 0.4,
//       fill: true,
//     },
//   ],
// };

// const moodBarData = {
//   labels: ['Class A', 'Class B', 'Class C', 'Class D'],
//   datasets: [
//     {
//       label: 'Mood Score',
//       data: [4.0, 3.8, 4.6, 4.1],
//       backgroundColor: [
//         'rgba(191,219,254,0.9)',
//         'rgba(167,243,208,0.9)',
//         'rgba(254,240,138,0.9)',
//         'rgba(221,214,254,0.9)',
//       ],
//       borderRadius: 8,
//     },
//   ],
// };

// const flaggedStudents = [
//   { name: 'Priya Sharma', class: 'Class 10', score: 2.5, updated: '2024-07-26 10:00 AM' },
//   { name: 'Arjun Verma', class: 'Class 11', score: 2.8, updated: '2024-07-26 11:30 AM' },
//   { name: 'Divya Patel', class: 'Class 9', score: 2.2, updated: '2024-07-26 09:45 AM' },
//   { name: 'Rohan Singh', class: 'Class 12', score: 2.9, updated: '2024-07-26 12:15 PM' },
//   { name: 'Anika Kapoor', class: 'Class 10', score: 2.7, updated: '2024-07-26 08:30 AM' },
// ];

// function AdminDashboard() {

//   return (
//     <div className="admin-root">
//       <Navbar active="Dashboard" currentRole="counselor" showLinks={true} />
//       <main className="admin-main">
//         <h1 className="admin-title">Attendance & Mood Dashboard</h1>
//         <p className="admin-subtitle">An overview of student well-being and engagement.</p>
//         <div className="admin-reports-row">
//           <span className="admin-reports-title">Student Reports</span>
//         </div>
//         {/* Summary Section */}
//         <div className="admin-section">
//           <span className="admin-section-title">Summary</span>
//           <SummaryCards summary={summary} />
//         </div>
//         {/* Mood Trends Section */}
//         <div className="admin-section">
//           <span className="admin-section-title">Mood Trends</span>
//           <MoodTrends moodLineData={moodLineData} moodBarData={moodBarData} />
//         </div>
//         {/* Students Flagged Section (heading is in the component, so update there too) */}
//         {/* <FlaggedStudentsTable flaggedStudents={flaggedStudents} /> */}
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard; 

// import { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import SummaryCards from '../components/SummaryCards';
// import MoodTrends from '../components/MoodTrends';
// import '../components_css/TeacherDashboard.css';

// const summary = [
//   {
//     title: 'Total Attendance',
//     value: '95%',
//     sub: '+2% from last week',
//     subColor: 'text-green-500',
//   },
//   {
//     title: 'Average Mood Score',
//     value: '4.2/5',
//     sub: '-0.1 from last week',
//     subColor: 'text-red-500',
//   },
//   {
//     title: 'Students Flagged',
//     value: '12',
//     sub: '+5 new alerts today',
//     subColor: 'text-yellow-500',
//   },
// ];

// const moodLineData = {
//   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//   datasets: [
//     {
//       label: 'Mood Score',
//       data: [4.0, 4.2, 4.1, 3.9, 4.5, 3.7, 4.3],
//       borderColor: '#a78bfa',
//       backgroundColor: 'rgba(139,92,246,0.15)',
//       tension: 0.4,
//       fill: true,
//     },
//   ],
// };

// const moodBarData = {
//   labels: ['Class A', 'Class B', 'Class C', 'Class D'],
//   datasets: [
//     {
//       label: 'Mood Score',
//       data: [4.0, 3.8, 4.6, 4.1],
//       backgroundColor: [
//         'rgba(191,219,254,0.9)',
//         'rgba(167,243,208,0.9)',
//         'rgba(254,240,138,0.9)',
//         'rgba(221,214,254,0.9)',
//       ],
//       borderRadius: 8,
//     },
//   ],
// };

// function AdminDashboard() {
//   const [flaggedStudents, setFlaggedStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFlagged = async () => {
//       try {
//         const res = await fetch('http://localhost:3000/api/auth/flagged-students');
//         const data = await res.json();
//         setFlaggedStudents(data);
//       } catch (err) {
//         console.error('Error fetching flagged students:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFlagged();
//   }, []);

//   return (
//     <div className="admin-root">
//       <Navbar active="Dashboard" currentRole="counselor" showLinks={true} />
//       <main className="admin-main">
//         <h1 className="admin-title">Attendance & Mood Dashboard</h1>
//         <p className="admin-subtitle">An overview of student well-being and engagement.</p>
//         <div className="admin-reports-row">
//           <span className="admin-reports-title">Student Reports</span>
//         </div>

//         {/* Summary Section */}
//         <div className="admin-section">
//           <span className="admin-section-title">Summary</span>
//           <SummaryCards summary={summary} />
//         </div>

//         {/* Mood Trends Section */}
//         <div className="admin-section">
//           <span className="admin-section-title">Mood Trends</span>
//           <MoodTrends moodLineData={moodLineData} moodBarData={moodBarData} />
//         </div>

//         {/* Inline Flagged Students Table */}
//         <div className="flagged-section">
//   <span className="flagged-section-title">Flagged Students</span>
//   {loading ? (
//     <p>Loading flagged students...</p>
//   ) : flaggedStudents.length === 0 ? (
//     <p>No students flagged with mood score below 3.5</p>
//   ) : (
//     <div className="flagged-table-container">
//       <table className="flagged-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Class</th>
//             <th>Mood Score</th>
//             <th>Last Updated</th>
//           </tr>
//         </thead>
//         <tbody>
//           {flaggedStudents.map((student) => (
//             <tr key={student._id}>
//               <td>{student.username}</td>
//               <td>{student.classSection}</td>
//               <td>{student.moodAvg.toFixed(2)-1}</td>
//               <td>{new Date(student.updatedAt).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )}
// </div>
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;


import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import SummaryCards from '../components/SummaryCards';
import MoodTrends from '../components/MoodTrends';
import '../components_css/TeacherDashboard.css';
// import '../components_css/FlaggedStudents.css';

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

function AdminDashboard() {
  const [flaggedStudents, setFlaggedStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState([
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
      value: '0',
      sub: 'Loading...',
      subColor: 'text-yellow-500',
    },
  ]);

  useEffect(() => {
    const fetchFlagged = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/auth/flagged-students');
        const data = await res.json();
        setFlaggedStudents(data);

        setSummary((prev) => {
          const updated = [...prev];
          updated[2] = {
            ...updated[2],
            value: data.length.toString(),
            sub: `${data.length} total flagged`,
            subColor: data.length > 0 ? 'text-red-500' : 'text-green-500',
          };
          return updated;
        });
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

        {/* Flagged Students Section */}
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
                      <td>{student.moodAvg?.toFixed(2)}</td>
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
