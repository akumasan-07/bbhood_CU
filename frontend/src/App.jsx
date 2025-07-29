import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import TeacherSignup from './components/TeacherSignup';
import TeacherLogin from './components/TeacherLogin';
import StudentSignup from './components/StudentSignup';
import StudentLogin from './components/StudentLogin';
import StudentDashboard from './pages/StudentDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentCheckin from './pages/StudentCheckin';
import StudentReport from './pages/StudentReport';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import CounselorSignup from './components/CounselorSignup';
import CounselorLogin from './components/CounselorLogin';

function ProtectedRoute({ element, user, redirectTo }) {
  const location = useLocation();
  return user ? element : <Navigate to={redirectTo + '?reason=session-expired'} state={{ from: location }} replace />;
}

function App() {
  const [teacher, setTeacher] = useState(null);
  const [teacherStudents, setTeacherStudents] = useState([]); // NEW
  const [attendanceData, setAttendanceData] = useState([]); // NEW
  const [student, setStudent] = useState(null);
  const [counselor, setCounselor] = useState(null); // NEW
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (data.role === 'teacher') setTeacher(data.user);
          else if (data.role === 'student') setStudent(data.user);
          else if (data.role === 'counselor') setCounselor(data.user);
        } else {
          setTeacher(null);
          setStudent(null);
          setCounselor(null);
        }
      } catch {
        setTeacher(null);
        setStudent(null);
        setCounselor(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  if (loading) return <div style={{textAlign:'center',marginTop:'20vh',fontSize:'2rem'}}>Loading...</div>;

  // Helper for teacher viewing student details
  function StudentReportForTeacher() {
    const { studentId } = useParams();
    return <StudentReport studentId={studentId} setTeacher={setTeacher} />;
  }

  // Remove StudentDetailsForCounselor helper

  return (
    <>
      {/* <TeacherDashboard /> Removed to prevent always showing dashboard */}
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Navigate to="/teacher/signup" replace />} />
          <Route path="/teacher/signup" element={<RouteRenderer role="teacher" mode="signup" FormComponent={TeacherSignup} setTeacher={setTeacher} />} />
          <Route path="/teacher/login" element={<RouteRenderer role="teacher" mode="login" FormComponent={TeacherLogin} setTeacher={setTeacher} setTeacherStudents={setTeacherStudents} setAttendanceData={setAttendanceData} />} />
          <Route path="/student/signup" element={<RouteRenderer role="student" mode="signup" FormComponent={StudentSignup} setStudent={setStudent} />} />
          <Route path="/student/login" element={<RouteRenderer role="student" mode="login" FormComponent={StudentLogin} setStudent={setStudent} />} />
          <Route path="/student/dashboard" element={<ProtectedRoute user={student} redirectTo="/student/login" element={<StudentDashboard student={student} setStudent={setStudent} />} />} />
          <Route path="/counselor/signup" element={<RouteRenderer role="counselor" mode="signup" FormComponent={CounselorSignup} setCounselor={setCounselor} />} />
          <Route path="/counselor/login" element={<RouteRenderer role="counselor" mode="login" FormComponent={CounselorLogin} setCounselor={setCounselor} />} />
          <Route path="/counselor/dashboard" element={<ProtectedRoute user={counselor} redirectTo="/counselor/login" element={<AdminDashboard />} />} />
          <Route path="/teacher/dashboard" element={<ProtectedRoute user={teacher} redirectTo="/teacher/login" element={<TeacherDashboard teacher={teacher} setTeacher={setTeacher} students={teacherStudents} attendanceData={attendanceData} setAttendanceData={setAttendanceData} />} />} />
          <Route path="/teacher/attendance" element={<ProtectedRoute user={teacher} redirectTo="/teacher/login" element={<StudentCheckin />} />} />
          <Route path="/student/details" element={<ProtectedRoute user={student} redirectTo="/student/login" element={<StudentReport />} />} />
          <Route path="/teacher/student/:studentId" element={<ProtectedRoute user={teacher} redirectTo="/teacher/login" element={<StudentReportForTeacher />} />} />
          <Route path="/counselor/student/:studentId" element={<ProtectedRoute user={counselor} redirectTo="/counselor/login" element={<StudentReport currentRole="counselor" />} />} />
        </Routes>
      </Router>
    </>
  );
}

function RouteRenderer({ FormComponent, role, mode, setTeacher, setStudent, setTeacherStudents, setAttendanceData, setCounselor }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reason = params.get('reason');
  return (
    <div>
      {reason === 'session-expired' && (
        <div style={{color:'#b91c1c',background:'#fee2e2',padding:'12px 20px',borderRadius:8,marginBottom:16,fontWeight:600,textAlign:'center'}}>Session expired, please log in again.</div>
      )}
      <FormComponent
        onSwitch={(newRole) => {
          if (newRole === 'teacher') {
            navigate('/teacher/signup');
          } else if (newRole === 'student') {
            navigate('/student/signup');
          } else if (newRole === 'counselor') {
            navigate('/counselor/signup');
          }
        }}
        onModeChange={(newMode) => {
          if (role === 'teacher') {
            navigate(`/teacher/${newMode}`);
          } else if (role === 'student') {
            navigate(`/student/${newMode}`);
          } else if (role === 'counselor') {
            navigate(`/counselor/${newMode}`);
          }
        }}
        onSuccess={
          setTeacher && role === 'teacher'
            ? (teacherObj, studentsArr) => {
                setTeacher(teacherObj);
                if (setTeacherStudents) setTeacherStudents(studentsArr || []);
                if (setAttendanceData) {
                  const today = new Date().toISOString().slice(0, 10);
                  // Create attendance data structure without automatically adding mock data
                  const mockAttendanceData = (studentsArr || []).map(s => {
                    // Use existing attendance data without adding mock entries for new students
                    const mockAttendance = Array.isArray(s.attendance) ? s.attendance : [];
                    
                    // Only add mock data if this is a development environment and student has existing attendance
                    // This ensures new students don't automatically get mood scores
                    if (process.env.NODE_ENV === 'development' && 
                        s.totalAttendance > 0 && 
                        !mockAttendance.some(a => {
                          const d = a.date ? new Date(a.date).toISOString().slice(0, 10) : '';
                          return d === today;
                        })) {
                      mockAttendance.push({
                        date: today,
                        status: 'Present',
                        mood: 'Happy',
                        moodScore: Math.floor(Math.random() * 5) + 1 // Random score between 1-5
                      });
                    }
                    
                    return {
                      name: s.username || s.name || s.studentID,
                      studentID: s.studentID || s._id,
                      date: today,
                      status: 'Present',
                      percent: s.totalClass > 0 ? `${Math.round((s.totalAttendance / s.totalClass) * 100)}%` : '0%',
                      statusColor: 'green',
                      totalAttendance: typeof s.totalAttendance === 'number' ? s.totalAttendance : 0,
                      totalClass: typeof s.totalClass === 'number' ? s.totalClass : 0,
                      attendance: mockAttendance,
                    };
                  });
                  
                  setAttendanceData(mockAttendanceData);
                }
                navigate('/teacher/dashboard');
              }
            : setStudent && role === 'student'
            ? (studentObj) => {
                setStudent(studentObj);
                navigate('/student/dashboard');
              }
            : setCounselor && role === 'counselor'
            ? (counselorObj) => {
                setCounselor(counselorObj);
                navigate('/counselor/dashboard');
              }
            : undefined
        }
      />
    </div>
  ); 
}

export default App;

