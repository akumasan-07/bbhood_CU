// import React from 'react';
// import "../components_css/TeacherDashboard.css";

// const TeacherDashboard = ({ teacher }) => {
//   // Example static data
//   const attendance = [
//     { date: '2024-07-20', time: '9:00 AM', status: 'Present', mood: 'Happy' },
//     { date: '2024-07-19', time: '9:05 AM', status: 'Present', mood: 'Neutral' },
//     { date: '2024-07-18', time: '9:00 AM', status: 'Present', mood: 'Happy' },
//     { date: '2024-07-17', time: '9:15 AM', status: 'Late', mood: 'Anxious' },
//     { date: '2024-07-16', time: '-', status: 'Absent', mood: '-' },
//   ];
//   const flagged = [
//     { date: '2024-07-15', desc: 'Student appeared distressed during class' },
//     { date: '2024-07-08', desc: 'Student showed signs of anxiety during exam' },
//   ];

//   return (
//     <div className="tdb-root">
//       <aside className="tdb-sidebar">
//         <div className="tdb-sidebar-header">
//           <div className="tdb-avatar"></div>
//           <div>
//             <h1>Vidya Mandir School</h1>
//             <p>Admin</p>
//           </div>
//         </div>
//         <nav>
//           <a className="tdb-nav-link active" href="#">Dashboard</a>
//           <a className="tdb-nav-link" href="#">Attendance</a>
//           <a className="tdb-nav-link" href="#">Mood Analysis</a>
//           <a className="tdb-nav-link" href="#">Reports</a>
//           <a className="tdb-nav-link" href="#">Settings</a>
//         </nav>
//       </aside>
//       <main className="tdb-main">
//         <div className="tdb-header">
//           <h1>Student Report - Anika Sharma</h1>
//           <p>Class 10A</p>
//         </div>
//         <div className="tdb-content">
//           <section>
//             <h2>Attendance History</h2>
//             <table className="tdb-table">
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Time</th>
//                   <th>Status</th>
//                   <th>Mood</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {attendance.map((row, i) => (
//                   <tr key={i}>
//                     <td>{row.date}</td>
//                     <td>{row.time}</td>
//                     <td>
//                       <span className={`tdb-status tdb-status-${row.status.toLowerCase()}`}>{row.status}</span>
//                     </td>
//                     <td className={`tdb-mood tdb-mood-${row.mood.toLowerCase()}`}>{row.mood}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </section>
//           <section>
//             <h2>Flagged Instances</h2>
//             <table className="tdb-table">
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Description</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {flagged.map((row, i) => (
//                   <tr key={i}>
//                     <td>{row.date}</td>
//                     <td>{row.desc}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </section>
//           <section>
//             <h2>Interventions/Support</h2>
//             <div className="tdb-support">
//               Student received counseling on <b>2024-07-16</b> and <b>2024-07-23</b>. No further interventions are currently scheduled.
//             </div>
//           </section>
//         </div>
//         <div className="tdb-moodtrend">
//           <h2>Mood Trend</h2>
//           <div className="tdb-moodtrend-box">
//             <p>Average Mood: <span className="tdb-mood-positive">Positive</span></p>
//             <p>Last 30 Days <span className="tdb-mood-positive">+5%</span></p>
//             {/* You can add a static SVG or chart here */}
//             <div className="tdb-moodtrend-chart"></div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default TeacherDashboard; 


import React from 'react'

function TeacherDashboard() {
  return (
    <div>welcom to teacher dashboard</div>
  )
}

export default TeacherDashboard