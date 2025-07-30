// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import StudentHeader from '../components/student-details/StudentHeader';
// import AttendanceHistoryTable from '../components/student-details/AttendanceHistoryTable';
// import MoodTrendCard from '../components/student-details/MoodTrendCard';
// import FlaggedInstancesTable from '../components/student-details/FlaggedInstancesTable';
// import InterventionsCard from '../components/student-details/InterventionsCard';
// import '../components_css/TeacherDashboard.css';

// const flagged = [
//   { date: '2024-07-15', desc: 'Student appeared distressed during class' },
//   { date: '2024-07-08', desc: 'Student showed signs of anxiety during exam' },
// ];

// const interventions = [
//   '2024-07-16',
//   '2024-07-23',
// ];
// const StudentReport = ({ setTeacher, studentId: propStudentId }) => {
//   const params = useParams();
//   const studentId = propStudentId || params.studentId;
//   const [studentObj, setStudentObj] = useState(null);
//   useEffect(() => {
//     fetch(`/api/auth/student/${studentId}`)
//       .then(res => res.json())
//       .then(data => {
//         console.log("Fetched student data:", data);
//         setStudentObj(data);
//       });
//   }, [studentId]);
//   const studentName = studentObj?.username || studentObj?.name || studentId;

//   return (
//     <div className="sd-root">
//       <Navbar active="Reports" showLinks={true} currentRole="teacher" setTeacher={setTeacher} />
//       <div className="sd-container">
//         <div className="sd-header" style={{display: 'flex', alignItems: 'center', gap: 24, marginBottom: 0}}>
//           <div className="sd-header-avatar" style={{minWidth: 64, minHeight: 64, fontSize: '2.2rem', background: '#e0c3fc', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700}}>
//             {studentName ? studentName[0].toUpperCase() : 'S'}
//           </div>
//           <div>
//             <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#181028', marginBottom: '0.5rem' }}>Student's Report</h1>
//             <div style={{ fontWeight: 700, fontSize: '1.5rem', color: '#7c19e5', marginBottom: '0.2rem' }}>
//               {studentName || 'Student'}
//               <span style={{ color: '#a259e6', marginLeft: 8 }}>— {studentObj?.classSection || 'IT'}</span>
//             </div>
//             <div style={{ color: '#7c5fa3', fontSize: '1.25rem', marginTop: 8 }}>
//               An overview of your attendance and check-ins.
//             </div>
//           </div>
//         </div>
//         <div className="sd-section-row">
//           <div className="sd-section-col">
//             <AttendanceHistoryTable attendance={studentObj?.attendance || []} />
//           </div>
//           <div className="sd-section-col">
//             <MoodTrendCard />
//           </div>
//         </div>
//         <div className="sd-section-row">
//           <div className="sd-section-col">
//             <FlaggedInstancesTable flagged={flagged} />
//           </div>
//           <div className="sd-section-col">
//             <InterventionsCard interventions={interventions} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentReport; 

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StudentHeader from '../components/student-details/StudentHeader';
import AttendanceHistoryTable from '../components/student-details/AttendanceHistoryTable';
import MoodTrendCard from '../components/student-details/MoodTrendCard';
import FlaggedInstancesTable from '../components/student-details/FlaggedInstancesTable';
import InterventionsCard from '../components/student-details/InterventionsCard';
import '../components_css/TeacherDashboard.css';

// --------------------------
// ✅ Dummy Data Generators
// --------------------------

const moods = ['Happy', 'Neutral', 'Anxious'];
const statuses = ['Present', 'Late', 'Absent'];

const generateDummyAttendance = () => {
  const dummy = [];
  const now = Date.now();

  for (let i = 0; i < 10; i++) {
    const dateOffset = Math.floor(Math.random() * 10); // 0–9 days ago
    const date = new Date(now - dateOffset * 86400000);
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const mood = status === 'Absent' ? '—' : moods[Math.floor(Math.random() * moods.length)];
    const time =
      status === 'Absent'
        ? '—'
        : `${9 + Math.floor(Math.random() * 2)}:${Math.random() > 0.5 ? '00' : '15'} AM`;

    dummy.push({
      _id: `dummy${i}`,
      date: date.toISOString(),
      time,
      status,
      mood,
    });
  }

  const shuffled = dummy.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 2) + 3); // 3 or 4
};

const allFlagged = [
  { date: '2024-07-01', desc: 'Student was unusually quiet in class' },
  { date: '2024-08-03', desc: 'Missed multiple assignments' },
  { date: '2024-06-05', desc: 'Left class early without notice' },
  { date: '2024-07-06', desc: 'Appeared distracted and unengaged' },
  { date: '2024-07-08', desc: 'Showed signs of anxiety during exam' },
  { date: '2024-05-10', desc: 'Reported feeling overwhelmed' },
  { date: '2024-07-12', desc: 'Conflicted with peers' },
  { date: '2024-07-14', desc: 'Frequent restroom breaks' },
  { date: '2024-03-15', desc: 'Appeared distressed during class' },
  { date: '2024-07-18', desc: 'Unusual behavior during presentation' },
];

const getRandomFlagged = () => {
  const shuffled = allFlagged.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
};

const allInterventions = [
  '2024-07-01',
  '2024-07-03',
  '2024-07-05',
  '2024-07-07',
  '2024-07-10',
  '2024-07-12',
  '2024-07-16',
  '2024-07-18',
  '2024-07-21',
  '2024-07-23',
];

const getRandomInterventions = () => {
  const shuffled = allInterventions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
};

// --------------------------
// ✅ Main Component
// --------------------------

const StudentReport = ({ setTeacher, studentId: propStudentId }) => {
  const params = useParams();
  const studentId = propStudentId || params.studentId;

  const [studentObj, setStudentObj] = useState(null);
  const [dummyAttendance] = useState(generateDummyAttendance());
  const [flagged] = useState(getRandomFlagged());
  const [interventions] = useState(getRandomInterventions());

  useEffect(() => {
    fetch(`/api/auth/student/${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched student data:', data);
        setStudentObj(data);
      })
      .catch((err) => {
        console.error('Failed to fetch student:', err);
      });
  }, [studentId]);

  const studentName = studentObj?.username || studentObj?.name || studentId;

  return (
    <div className="sd-root">
      <Navbar active="Reports" showLinks={true} currentRole="teacher" setTeacher={setTeacher} />
      <div className="sd-container">
        <div
          className="sd-header"
          style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 0 }}
        >
          <div
            className="sd-header-avatar"
            style={{
              minWidth: 64,
              minHeight: 64,
              fontSize: '2.2rem',
              background: '#e0c3fc',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
            }}
          >
            {studentName ? studentName[0].toUpperCase() : 'S'}
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#181028', marginBottom: '0.5rem' }}>
              Student's Report
            </h1>
            <div
              style={{
                fontWeight: 700,
                fontSize: '1.5rem',
                color: '#7c19e5',
                marginBottom: '0.2rem',
              }}
            >
              {studentName || 'Student'}
              <span style={{ color: '#a259e6', marginLeft: 8 }}>
                — {studentObj?.classSection || 'IT'}
              </span>
            </div>
            <div style={{ color: '#7c5fa3', fontSize: '1.25rem', marginTop: 8 }}>
              An overview of your attendance and check-ins.
            </div>
          </div>
        </div>

        <div className="sd-section-row">
          <div className="sd-section-col">
            <AttendanceHistoryTable
              attendance={
                Array.isArray(studentObj?.attendance) && studentObj.attendance.length > 0
                  ? studentObj.attendance
                  : dummyAttendance
              }
            />
          </div>
          <div className="sd-section-col">
            <MoodTrendCard />
          </div>
        </div>

        <div className="sd-section-row">
          <div className="sd-section-col">
            <FlaggedInstancesTable flagged={flagged} />
          </div>
          <div className="sd-section-col">
            <InterventionsCard interventions={interventions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentReport;
