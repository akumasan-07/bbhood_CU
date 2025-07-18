import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import TeacherSignup from './components/TeacherSignup';
import TeacherLogin from './components/TeacherLogin';
import StudentSignup from './components/StudentSignup';
import StudentLogin from './components/StudentLogin';
// import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentCheckin from './pages/StudentCheckin';
import StudentDetails from './pages/StudentDetails';
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
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (data.role === 'teacher') setTeacher(data.user);
          else if (data.role === 'student') setStudent(data.user);
        } else {
          setTeacher(null);
          setStudent(null);
        }
      } catch {
        setTeacher(null);
        setStudent(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  if (loading) return <div style={{textAlign:'center',marginTop:'20vh',fontSize:'2rem'}}>Loading...</div>;

  // Helper for teacher viewing student details
  function StudentDetailsForTeacher() {
    const { studentId } = useParams();
    return <StudentDetails studentId={studentId} setTeacher={setTeacher} />;
  }

  return (
    <>
      {/* <TeacherDashboard /> Removed to prevent always showing dashboard */}
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Navigate to="/teacher/signup" replace />} />
          <Route path="/teacher/signup" element={<RouteRenderer role="teacher" mode="signup" FormComponent={TeacherSignup} setTeacher={setTeacher} />} />
          <Route path="/teacher/login" element={<RouteRenderer role="teacher" mode="login" FormComponent={TeacherLogin} setTeacher={setTeacher} setTeacherStudents={setTeacherStudents} />} />
          <Route path="/student/signup" element={<RouteRenderer role="student" mode="signup" FormComponent={StudentSignup} setStudent={setStudent} />} />
          <Route path="/student/login" element={<RouteRenderer role="student" mode="login" FormComponent={StudentLogin} setStudent={setStudent} />} />
          <Route path="/counselor/signup" element={<RouteRenderer role="counselor" mode="signup" FormComponent={CounselorSignup} />} />
          <Route path="/counselor/login" element={<RouteRenderer role="counselor" mode="login" FormComponent={CounselorLogin} />} />
          <Route path="/teacher/dashboard" element={<ProtectedRoute user={teacher} redirectTo="/teacher/login" element={<TeacherDashboard teacher={teacher} setTeacher={setTeacher} students={teacherStudents} />} />} />
          <Route path="/teacher/attendance" element={<ProtectedRoute user={teacher} redirectTo="/teacher/login" element={<StudentCheckin />} />} />
          <Route path="/student/dashboard" element={<ProtectedRoute user={student} redirectTo="/student/login" element={<StudentDashboard student={student} setStudent={setStudent} />} />} />
          <Route path="/student/details" element={<ProtectedRoute user={student} redirectTo="/student/login" element={<StudentDetails />} />} />
          <Route path="/teacher/student/:studentId" element={<ProtectedRoute user={teacher} redirectTo="/teacher/login" element={<StudentDetailsForTeacher />} />} />
        </Routes>
      </Router>
    </>
  );
}

function RouteRenderer({ FormComponent, role, mode, setTeacher, setStudent, setTeacherStudents }) {
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
                navigate('/teacher/dashboard');
              }
            : setStudent && role === 'student'
            ? (studentObj) => {
                setStudent(studentObj);
                navigate('/student/dashboard');
              }
            : undefined
        }
      />
    </div>
  );
}

export default App;

