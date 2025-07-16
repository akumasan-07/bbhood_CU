import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import TeacherSignup from './components/TeacherSignup';
import TeacherLogin from './components/TeacherLogin';
import StudentSignup from './components/StudentSignup';
import StudentLogin from './components/StudentLogin';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [teacher, setTeacher] = useState(null);
  const [student, setStudent] = useState(null);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Navigate to="/teacher/signup" replace />} />
        <Route path="/teacher/signup" element={<RouteRenderer role="teacher" mode="signup" FormComponent={TeacherSignup} setTeacher={setTeacher} />} />
        <Route path="/teacher/login" element={<RouteRenderer role="teacher" mode="login" FormComponent={TeacherLogin} setTeacher={setTeacher} />} />
        <Route path="/student/signup" element={<RouteRenderer role="student" mode="signup" FormComponent={StudentSignup} setStudent={setStudent} />} />
        <Route path="/student/login" element={<RouteRenderer role="student" mode="login" FormComponent={StudentLogin} setStudent={setStudent} />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard teacher={teacher} />} />
        <Route path="/student/dashboard" element={<StudentDashboard student={student} />} />
      </Routes>
    </Router>
  );
}

function RouteRenderer({ FormComponent, role, mode, setTeacher, setStudent }) {
  const navigate = useNavigate();
  return (
    <div>
      <FormComponent
        onSwitch={(newRole) => {
          if (newRole === 'teacher') {
            navigate('/teacher/signup');
          } else {
            navigate('/student/signup');
          }
        }}
        onModeChange={(newMode) => {
          if (role === 'teacher') {
            navigate(`/teacher/${newMode}`);
          } else {
            navigate(`/student/${newMode}`);
          }
        }}
        onSuccess={
          setTeacher && role === 'teacher'
            ? (teacherObj) => {
                setTeacher(teacherObj);
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