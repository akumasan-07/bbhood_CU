// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const statusOptions = [
//   { label: 'All Statuses', value: '' },
//   { label: 'Present', value: 'Present' },
//   { label: 'Absent', value: 'Absent' },
//   { label: 'Late', value: 'Late' },
// ];

// const StudentAttendanceTable = ({ attendanceData, setAttendanceData }) => {
//   console.log('Attendance data:', attendanceData);
//   const [statusFilter, setStatusFilter] = useState('');
//   const navigate = useNavigate();

//   // Track last attendance date in localStorage
//   useEffect(() => {
//     const today = new Date().toISOString().slice(0, 10);
//     const lastAttendanceDate = localStorage.getItem('lastAttendanceDate');
//     if (lastAttendanceDate !== today) {
//       // New day: reset all statuses to dash
//       setAttendanceData(prev => prev.map(row => ({ ...row, status: '–', statusColor: '', date: today })));
//       localStorage.setItem('lastAttendanceDate', today);
//     }
//   }, [setAttendanceData]);

//   // Fetch latest attendance data from backend
//   const fetchAttendanceData = async () => {
//     try {
//       const res = await fetch('/api/teacher/students'); // Adjust endpoint if needed
//       const data = await res.json();
//       if (data.students) setAttendanceData(data.students);
//     } catch (err) {
//       // Optionally handle error
//     }
//   };

//   const handleMark = async (studentId, status) => {
//     let actualStatus = status;
//     // Prevent duplicate attendance marking
//     const row = attendanceData.find(r => r.studentID === studentId);
//     const today = new Date().toISOString().slice(0, 10);
//     if (row && Array.isArray(row.attendance) && row.attendance.some(record => new Date(record.date).toISOString().slice(0, 10) === today)) {
//       toast.error('Attendance already marked for today!');
//       return;
//     }
//     try {
//       const res = await fetch('http://localhost:3000/api/auth/attendance/mark', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ studentId, status: actualStatus }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.success(`${actualStatus} marked for student!`);
//         // Immediately update the status in the table for instant feedback
//         setAttendanceData(prev => prev.map(row =>
//           row.studentID === studentId
//             ? {
//                 ...row,
//                 status: actualStatus,
//                 // Update attendance array with status and mood data
//                 attendance: Array.isArray(row.attendance)
//                   ? [...row.attendance, {
//                       date: new Date(),
//                       status: actualStatus,
//                       mood: 'Neutral', // Default mood
//                       moodScore: 3 // Default mood score (neutral)
//                     }]
//                   : [{ 
//                       date: new Date(), 
//                       status: actualStatus,
//                       mood: 'Neutral',
//                       moodScore: 3
//                     }]
//               }
//             : row
//         ));
//         // Optionally, also fetch latest data from backend for full sync
//         await fetchAttendanceData();
//       } else {
//         toast.error(data.message || 'Failed to mark attendance');
//       }
//     } catch (err) {
//       toast.error('Error marking attendance');
//     }
//   };

//   // Helper to check if buttons should be disabled for a student (based on backend attendance array)
//   const isAttendanceDisabled = (row) => {
//     const today = new Date().toISOString().slice(0, 10);
//     if (Array.isArray(row.attendance)) {
//       return row.attendance.some(
//         record => new Date(record.date).toISOString().slice(0, 10) === today
//       );
//     }
//     return false;
//   };

//   const filteredData = statusFilter
//     ? attendanceData.filter(row => row.status === statusFilter)
//     : attendanceData;

//   return (
//     <div style={{ marginBottom: '2em' }}>
//       <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
//         <h2 className="tdb-header" style={{ fontSize: '1.1rem', fontWeight: 700 }}>Student Attendance</h2>
//         <div>
//           <select
//             style={{ borderRadius: 6, border: '1px solid #dbd0e7', padding: '6px 12px', fontSize: '1rem' }}
//             value={statusFilter}
//             onChange={e => setStatusFilter(e.target.value)}
//           >
//             {statusOptions.map(opt => (
//               <option key={opt.value} value={opt.value}>{opt.label}</option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className="tdb-support" style={{ padding: 0, background: '#fff', border: '1px solid #dbd0e7', borderRadius: 12 }}>
//         <div style={{ maxHeight: 400, overflowY: 'auto' }}>
//           <table className="tdb-table">
//             <thead>
//               <tr>
//                 <th>Student Name</th>
//                 <th>Date</th>
//                 <th>Status</th>
//                 <th>Attendance %</th>
//                 <th>Class Attendance</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((row, idx) => (
//                 <tr
//                   key={idx}
//                   style={{ cursor: 'pointer', transition: 'background 0.2s' }}
//                   onClick={() => navigate(`/teacher/student/${row.studentID}`)}
//                   onMouseOver={e => e.currentTarget.style.background = '#f5f3fa'}
//                   onMouseOut={e => e.currentTarget.style.background = ''}
//                 >
//                   <td style={{ color: '#140e1b', fontWeight: 600 }}>{row.name}</td>
//                   <td>{row.date}</td>
//                   <td>
//                     {row.status === '–' ? (
//                       <span style={{ color: '#888', fontWeight: 600 }}>–</span>
//                     ) : (
//                       <span className={`tdb-status ${row.status === 'Present' ? 'tdb-status-present' : row.status === 'Absent' ? 'tdb-status-absent' : row.status === 'Late' ? 'tdb-status-late' : ''}`}>
//                         {row.status}
//                       </span>
//                     )}
//                   </td>
//                   <td style={{ color: row.statusColor === 'red' ? '#e53935' : row.statusColor === 'yellow' ? '#b45309' : '#065f46', fontWeight: 600 }}>{row.percent}</td>
//                   <td style={{ fontWeight: 600 }}>
//                     {typeof row.totalAttendance !== 'undefined' && typeof row.totalClass !== 'undefined'
//                       ? `${row.totalAttendance}/${row.totalClass}`
//                       : '0/0'}
//                   </td>
//                   <td>
//                     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
//                       <div>
//                         <button style={{ marginRight: 8, background: '#059669', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: isAttendanceDisabled(row) ? 'not-allowed' : 'pointer', opacity: isAttendanceDisabled(row) ? 0.5 : 1 }} onClick={e => { e.stopPropagation(); if (!isAttendanceDisabled(row)) handleMark(row.studentID, 'Present'); }} disabled={isAttendanceDisabled(row)} title={isAttendanceDisabled(row) ? 'Attendance already marked for today' : ''}>Present</button>
//                         <button style={{ marginRight: 8, background: '#b45309', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: isAttendanceDisabled(row) ? 'not-allowed' : 'pointer', opacity: isAttendanceDisabled(row) ? 0.5 : 1 }} onClick={e => { e.stopPropagation(); if (!isAttendanceDisabled(row)) handleMark(row.studentID, 'Late'); }} disabled={isAttendanceDisabled(row)} title={isAttendanceDisabled(row) ? 'Attendance already marked for today' : ''}>Late</button>
//                         <button style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: isAttendanceDisabled(row) ? 'not-allowed' : 'pointer', opacity: isAttendanceDisabled(row) ? 0.5 : 1 }} onClick={e => { e.stopPropagation(); if (!isAttendanceDisabled(row)) handleMark(row.studentID, 'Absent'); }} disabled={isAttendanceDisabled(row)} title={isAttendanceDisabled(row) ? 'Attendance already marked for today' : ''}>Absent</button>
//                       </div>
//                       {isAttendanceDisabled(row) && (
//                         <span style={{ color: '#b45309', fontSize: '0.95em', marginTop: 2 }}>Attendance already marked for today</span>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentAttendanceTable;



import React from 'react';
import '../../components_css/TeacherDashboard.css';

function StudentAttendanceTable({ attendanceData, setAttendanceData }) {
  const today = new Date().toISOString().slice(0, 10);

  const markAttendance = (studentID, status) => {
    const updatedData = attendanceData.map(student => {
      if (student.studentID !== studentID) return student;

      const alreadyMarked = student.attendance?.some(
        a => new Date(a.date).toISOString().slice(0, 10) === today
      );

      if (alreadyMarked) return student;

      const newRecord = {
        date: new Date().toISOString(),
        status: status,
        moodScore: null // You can later update this if needed
      };

      return {
        ...student,
        attendance: [...(student.attendance || []), newRecord]
      };
    });

    setAttendanceData(updatedData);
  };

  return (
    <div className="attendance-table-container">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Date</th>
            <th>Status</th>
            <th>Attendance %</th>
            <th>Count</th>
            <th>Mark Attendance</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map(student => {
            const studentName = student.name || student.username || student.studentID;

            const isMarkedToday = student.attendance?.some(
              a => new Date(a.date).toISOString().slice(0, 10) === today
            );

            const presentCount = student.attendance?.filter(a => a.status === 'Present').length || 0;
            const totalCount = student.attendance?.length || 0;
            const percentage = totalCount > 0 ? ((presentCount / totalCount) * 100).toFixed(0) : 0;

            return (
              <tr key={student.studentID}>
                <td><strong>{studentName}</strong></td>
                <td>{today}</td>
                <td>
                  {isMarkedToday ? (
                    <span className="status-pill present">Present</span>
                  ) : (
                    <span className="status-pill not-marked">-</span>
                  )}
                </td>
                <td>{percentage}%</td>
                <td>{presentCount}/{totalCount}</td>
                <td>
                  <div className="attendance-buttons">
                    <button
                      className={`attendance-button present ${isMarkedToday ? 'disabled-button' : ''}`}
                      onClick={() => markAttendance(student.studentID, 'Present')}
                      disabled={isMarkedToday}
                    >
                      Present
                    </button>
                    <button
                      className={`attendance-button late ${isMarkedToday ? 'disabled-button' : ''}`}
                      onClick={() => markAttendance(student.studentID, 'Late')}
                      disabled={isMarkedToday}
                    >
                      Late
                    </button>
                    <button
                      className={`attendance-button absent ${isMarkedToday ? 'disabled-button' : ''}`}
                      onClick={() => markAttendance(student.studentID, 'Absent')}
                      disabled={isMarkedToday}
                    >
                      Absent
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StudentAttendanceTable;
