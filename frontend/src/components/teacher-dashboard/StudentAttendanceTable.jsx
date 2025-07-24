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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [thought, setThought] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  // Remove the useEffect that overwrites attendanceData

  // Fetch latest attendance data from backend
  const fetchAttendanceData = async () => {
    try {
      const res = await fetch('/api/teacher/students'); // Adjust endpoint if needed
      const data = await res.json();
      if (data.students) setAttendanceData(data.students);
    } catch (err) {
      // Optionally handle error
    }
  };

  const handleMark = async (studentId, status) => {
    setIsSubmitting(true);
    try {
      // 1. Call Python API for sentiment
      const formData = new FormData();
      formData.append('image_base64', photo);
      if (thought) formData.append('thought', thought);
      const sentimentRes = await fetch('http://localhost:5000/analyze-sentiment', {
        method: 'POST',
        body: formData,
      });
      const sentimentData = await sentimentRes.json();

      // 2. Send result to Node backend
      const res = await fetch('http://localhost:3000/api/auth/attendance/mark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          status,
          mood: sentimentData.final_class,
          moodScore: sentimentData.final_score
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`${status} marked for student!`);
        // Optionally update UI
        setAttendanceData(prev => prev.map(row =>
          row.studentID === studentId
            ? { ...row, status, mood: sentimentData.final_class, moodScore: sentimentData.final_score }
            : row
        ));
      } else {
        toast.error(data.message || 'Failed to mark attendance');
      }
    } catch (err) {
      toast.error('Error marking attendance');
    }
    setIsSubmitting(false);
    setPhoto(null);
    setThought('');
    setSelectedStudent(null);
  };

  // Helper to check if buttons should be disabled for a student (based on backend attendance array)
  const isAttendanceDisabled = (row) => {
    const today = new Date().toISOString().slice(0, 10);
    if (Array.isArray(row.attendance)) {
      return row.attendance.some(
        record => new Date(record.date).toISOString().slice(0, 10) === today
      );
    }
    return false;
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
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <div>
                        {/*
                        <button style={{ marginRight: 8, background: '#059669', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: isAttendanceDisabled(row) ? 'not-allowed' : 'pointer', opacity: isAttendanceDisabled(row) ? 0.5 : 1 }} onClick={e => { e.stopPropagation(); if (!isAttendanceDisabled(row)) handleMark(row.studentID, 'Present'); }} disabled={isAttendanceDisabled(row)} title={isAttendanceDisabled(row) ? 'Attendance already marked for today' : ''}>Present</button>
                        */}
                        {/*
                        <button style={{ marginRight: 8, background: '#b45309', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: isAttendanceDisabled(row) ? 'not-allowed' : 'pointer', opacity: isAttendanceDisabled(row) ? 0.5 : 1 }} onClick={e => { e.stopPropagation(); if (!isAttendanceDisabled(row)) handleMark(row.studentID, 'Late'); }} disabled={isAttendanceDisabled(row)} title={isAttendanceDisabled(row) ? 'Attendance already marked for today' : ''}>Late</button>
                        */}
                        {/*
                        <button style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: isAttendanceDisabled(row) ? 'not-allowed' : 'pointer', opacity: isAttendanceDisabled(row) ? 0.5 : 1 }} onClick={e => { e.stopPropagation(); if (!isAttendanceDisabled(row)) handleMark(row.studentID, 'Absent'); }} disabled={isAttendanceDisabled(row)} title={isAttendanceDisabled(row) ? 'Attendance already marked for today' : ''}>Absent</button>
                        */}
                      </div>
                      {isAttendanceDisabled(row) && (
                        <span style={{ color: '#b45309', fontSize: '0.95em', marginTop: 2 }}>Attendance already marked for today</span>
                      )}
                    </div>
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