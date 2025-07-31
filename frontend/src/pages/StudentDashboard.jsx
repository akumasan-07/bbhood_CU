import React from "react";
import Navbar from '../components/Navbar';
import '../components_css/TeacherDashboard.css';

const StudentDashboard = ({ student }) => {
  // Get attendance for last 30 days
  let attendanceData = [];
  if (student?.attendance && Array.isArray(student.attendance)) {
    const now = new Date();
    attendanceData = student.attendance
      .filter(record => {
        const recordDate = new Date(record.date);
        return (now - recordDate) / (1000 * 60 * 60 * 24) <= 30;
      })
      .map(record => {
        let checkIn = '--';
        if (record.time) {
          checkIn = record.time;
        } else if (record.date) {
          // Try to extract time from date if possible
          const d = new Date(record.date);
          if (!isNaN(d)) {
            checkIn = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
          }
        }
        return {
          date: new Date(record.date).toISOString().slice(0, 10),
          checkIn,
          status: record.status || '--',
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // Calculate average attendance percentage for last 30 days
  let avgAttendance = 0;
  let lastWeekAvg = 0;
  if (attendanceData.length > 0) {
    // 1 = Present, 0.5 = Late, 0 = Absent (case-insensitive)
    const score = attendanceData.map(r => {
      const status = r.status?.toLowerCase();
      return status === 'present' ? 1 : status === 'late' ? 0.5 : 0;
    });
    avgAttendance = Math.round((score.reduce((a, b) => a + b, 0) / attendanceData.length) * 100);
    // Last week (last 7 days)
    const now = new Date();
    const lastWeek = attendanceData.filter(r => (now - new Date(r.date)) / (1000 * 60 * 60 * 24) <= 7);
    if (lastWeek.length > 0) {
      const lastWeekScore = lastWeek.map(r => {
        const status = r.status?.toLowerCase();
        return status === 'present' ? 1 : status === 'late' ? 0.5 : 0;
      });
      lastWeekAvg = Math.round((lastWeekScore.reduce((a, b) => a + b, 0) / lastWeek.length) * 100);
    }
  }
  // Calculate change from previous week
  let prevWeekAvg = 0;
  if (attendanceData.length > 0) {
    const now = new Date();
    const prevWeek = attendanceData.filter(r => {
      const daysAgo = (now - new Date(r.date)) / (1000 * 60 * 60 * 24);
      return daysAgo > 7 && daysAgo <= 14;
    });
    if (prevWeek.length > 0) {
      const prevWeekScore = prevWeek.map(r => r.status === 'Present' ? 1 : r.status === 'Late' ? 0.5 : 0);
      prevWeekAvg = Math.round((prevWeekScore.reduce((a, b) => a + b, 0) / prevWeek.length) * 100);
    }
  }
  const weekChange = lastWeekAvg - prevWeekAvg;

  // Calculate total absences in last 30 days (case-insensitive)
  const totalAbsent = attendanceData.filter(r => r.status?.toLowerCase() === 'absent').length;
  // Calculate total late in last 30 days (case-insensitive)
  const totalLate = attendanceData.filter(r => r.status?.toLowerCase() === 'late').length;

  return (
    <div className="sd-root">
      <Navbar active="Dashboard" showLinks={true} currentRole="student" />
      <div className="sd-container">
        <div className="sd-header" style={{display: 'flex', alignItems: 'center', gap: 24, marginBottom: 0}}>
          <div className="sd-header-avatar" style={{minWidth: 64, minHeight: 64, fontSize: '2.2rem'}}>
            {student?.username ? student.username[0].toUpperCase() : 'S'}
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#181028', marginBottom: '0.5rem' }}>Student's Dashboard</h1>
            <div style={{ fontWeight: 700, fontSize: '1.5rem', color: '#7c19e5', marginBottom: '0.2rem' }}>
              {student?.username || 'Student'}
              {student?.classSection && (
                <span style={{ color: '#a259e6', marginLeft: 8 }}>— {student.classSection}</span>
              )}
            </div>
            <div style={{ color: '#7c5fa3', fontSize: '1.25rem', marginTop: 8 }}>
              An overview of your attendance and check-ins.
            </div>
          </div>
        </div>
        <div className="sd-section-row">
          <div className="sd-section-col">
            <div className="sd-card">
              <div className="summary-card-title">Overall Attendance (Last 30 Days)</div>
              <div className="summary-card-value">{avgAttendance}%</div>
              <div className="summary-card-sub">
                {weekChange > 0 ? '+' : ''}{weekChange}% from last week
              </div>
            </div>
          </div>
          <div className="sd-section-col">
            <div className="sd-card">
              <div className="summary-card-title">Days Absent</div>
              <div className="summary-card-value">{totalAbsent}</div>
              <div className="summary-card-sub">in the last 30 days</div>
            </div>
          </div>
          <div className="sd-section-col">
            <div className="sd-card">
              <div className="summary-card-title">Days Late</div>
              <div className="summary-card-value">{totalLate}</div>
              <div className="summary-card-sub">in the last 30 days</div>
            </div>
          </div>
        </div>
        <div className="sd-section-row">
          <div className="sd-section-col">
            <div className="sd-card">
              <div className="summary-card-title">Attendance Log</div>
              <table className="sd-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Check-in Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.length === 0 ? (
                    <tr><td colSpan={3}>No attendance records in the last 30 days.</td></tr>
                  ) : attendanceData.map(({ date, checkIn, status }) => (
                    <tr key={date + checkIn + status}>
                      <td>{date}</td>
                      <td>{checkIn}</td>
                      <td>
                        <span className={
                          status && status.toLowerCase() === 'present' ? 'sd-status-present' :
                          status && status.toLowerCase() === 'late' ? 'sd-status-late' :
                          'sd-status-absent'
                        }>{status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
