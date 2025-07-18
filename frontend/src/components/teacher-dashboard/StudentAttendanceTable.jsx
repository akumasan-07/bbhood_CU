import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const statusOptions = [
  { label: 'All Statuses', value: '' },
  { label: 'Present', value: 'Present' },
  { label: 'Absent', value: 'Absent' },
  { label: 'Late', value: 'Late' },
];

const StudentAttendanceTable = ({ attendanceData, setAttendanceData }) => {
  console.log('Attendance data:', attendanceData);
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  // Track last attendance date in localStorage
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const lastAttendanceDate = localStorage.getItem('lastAttendanceDate');
    if (lastAttendanceDate !== today) {
      // New day: reset all statuses to dash
      setAttendanceData(prev => prev.map(row => ({ ...row, status: '–', statusColor: '', date: today })));
      localStorage.setItem('lastAttendanceDate', today);
    }
  }, [setAttendanceData]);

  const handleMark = async (studentId, status) => {
    let actualStatus = status;
    // Remove after-12-PM logic: always allow 'Late'
    try {
      const res = await fetch('http://localhost:3000/api/auth/attendance/mark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, status: actualStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`${actualStatus} marked for student!`);
        setAttendanceData(prev => prev.map(row =>
          row.studentID === studentId
            ? {
                ...row,
                status: actualStatus,
                percent: data.student.totalClass > 0 ? `${Math.round((data.student.totalAttendance / data.student.totalClass) * 100)}%` : '0%',
                statusColor: actualStatus === 'Present' ? 'green' : actualStatus === 'Absent' ? 'red' : actualStatus === 'Late' ? 'yellow' : '',
                totalAttendance: data.student.totalAttendance,
                totalClass: data.student.totalClass,
                date: new Date().toISOString().slice(0, 10),
              }
            : row
        ));
      } else {
        toast.error(data.message || 'Failed to mark attendance');
      }
    } catch (err) {
      toast.error('Error marking attendance');
    }
  };

  const filteredData = statusFilter
    ? attendanceData.filter(row => row.status === statusFilter)
    : attendanceData;

  return (
    <div style={{ marginBottom: '2em' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
        <h2 className="tdb-header" style={{ fontSize: '1.1rem', fontWeight: 700 }}>Student Attendance</h2>
        <div>
          <select
            style={{ borderRadius: 6, border: '1px solid #dbd0e7', padding: '6px 12px', fontSize: '1rem' }}
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="tdb-support" style={{ padding: 0, background: '#fff', border: '1px solid #dbd0e7', borderRadius: 12 }}>
        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
          <table className="tdb-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Attendance %</th>
                <th>Class Attendance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, idx) => (
                <tr
                  key={idx}
                  style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                  onClick={() => navigate(`/teacher/student/${row.studentID}`)}
                  onMouseOver={e => e.currentTarget.style.background = '#f5f3fa'}
                  onMouseOut={e => e.currentTarget.style.background = ''}
                >
                  <td style={{ color: '#140e1b', fontWeight: 600 }}>{row.name}</td>
                  <td>{row.date}</td>
                  <td>
                    {row.status === '–' ? (
                      <span style={{ color: '#888', fontWeight: 600 }}>–</span>
                    ) : (
                      <span className={`tdb-status ${row.status === 'Present' ? 'tdb-status-present' : row.status === 'Absent' ? 'tdb-status-absent' : row.status === 'Late' ? 'tdb-status-late' : ''}`}>
                        {row.status}
                      </span>
                    )}
                  </td>
                  <td style={{ color: row.statusColor === 'red' ? '#e53935' : row.statusColor === 'yellow' ? '#b45309' : '#065f46', fontWeight: 600 }}>{row.percent}</td>
                  <td style={{ fontWeight: 600 }}>
                    {typeof row.totalAttendance !== 'undefined' && typeof row.totalClass !== 'undefined'
                      ? `${row.totalAttendance}/${row.totalClass}`
                      : '0/0'}
                  </td>
                  <td>
                    <button style={{ marginRight: 8, background: '#059669', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); handleMark(row.studentID, 'Present'); }}>Present</button>
                    <button style={{ marginRight: 8, background: '#b45309', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); handleMark(row.studentID, 'Late'); }}>Late</button>
                    <button style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); handleMark(row.studentID, 'Absent'); }}>Absent</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceTable; 