import React, { useState } from 'react';
import styles from '../components_css/StudentSignup.module.css';
import Navbar from './Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="#bbb" strokeWidth="2" d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.418 0-8 2.239-8 5v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-2.761-3.582-5-8-5Z"/></svg>
);
const IdIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#bbb" strokeWidth="2"/><path stroke="#bbb" strokeWidth="2" d="M7 9h6M7 13h4"/></svg>
);
const PhoneIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="#bbb" strokeWidth="2" d="M2 5.5A2.5 2.5 0 0 1 4.5 3h2A2.5 2.5 0 0 1 9 5.5v1A2.5 2.5 0 0 1 6.5 9h-2A2.5 2.5 0 0 1 2 6.5v-1ZM15 19.5A2.5 2.5 0 0 1 17.5 22h2A2.5 2.5 0 0 0 22 19.5v-1A2.5 2.5 0 0 0 19.5 16h-2A2.5 2.5 0 0 0 15 18.5v1ZM3 8.5v7A2.5 2.5 0 0 0 5.5 18h2A2.5 2.5 0 0 0 10 15.5v-7A2.5 2.5 0 0 0 7.5 6h-2A2.5 2.5 0 0 0 3 8.5ZM14 5.5A2.5 2.5 0 0 1 16.5 3h2A2.5 2.5 0 0 1 21 5.5v1A2.5 2.5 0 0 1 18.5 9h-2A2.5 2.5 0 0 1 14 6.5v-1ZM15 8.5v7A2.5 2.5 0 0 0 17.5 18h2A2.5 2.5 0 0 0 22 15.5v-7A2.5 2.5 0 0 0 19.5 6h-2A2.5 2.5 0 0 0 15 8.5Z"/></svg>
);
const EmailIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#bbb" strokeWidth="2"/><path stroke="#bbb" strokeWidth="2" d="M3 7l9 6 9-6"/></svg>
);
const LockIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="8" rx="2" stroke="#bbb" strokeWidth="2"/><path stroke="#bbb" strokeWidth="2" d="M8 11V7a4 4 0 1 1 8 0v4"/></svg>
);
const EyeIcon = ({ open, onClick }) => (
  <span onClick={onClick} style={{ cursor: 'pointer', marginLeft: 6, display: 'flex', alignItems: 'center' }}>
    {!open ? (
      <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g><path clipRule="evenodd" d="M22.6928 1.55018C22.3102 1.32626 21.8209 1.45915 21.6 1.84698L19.1533 6.14375C17.4864 5.36351 15.7609 4.96457 14.0142 4.96457C9.32104 4.96457 4.781 7.84644 1.11993 13.2641L1.10541 13.2854L1.09271 13.3038C0.970762 13.4784 0.967649 13.6837 1.0921 13.8563C3.79364 17.8691 6.97705 20.4972 10.3484 21.6018L8.39935 25.0222C8.1784 25.4101 8.30951 25.906 8.69214 26.1299L9.03857 26.3326C9.4212 26.5565 9.91046 26.4237 10.1314 26.0358L23.332 2.86058C23.553 2.47275 23.4219 1.97684 23.0392 1.75291L22.6928 1.55018ZM18.092 8.00705C16.7353 7.40974 15.3654 7.1186 14.0142 7.1186C10.6042 7.1186 7.07416 8.97311 3.93908 12.9239C3.63812 13.3032 3.63812 13.8561 3.93908 14.2354C6.28912 17.197 8.86102 18.9811 11.438 19.689L12.7855 17.3232C11.2462 16.8322 9.97333 15.4627 9.97333 13.5818C9.97333 11.2026 11.7969 9.27368 14.046 9.27368C15.0842 9.27368 16.0317 9.68468 16.7511 10.3612L18.092 8.00705ZM15.639 12.3137C15.2926 11.7767 14.7231 11.4277 14.046 11.4277C12.9205 11.4277 12 12.3906 12 13.5802C12 14.3664 12.8432 15.2851 13.9024 15.3624L15.639 12.3137Z" fill="#bbb" fillRule="evenodd"></path><path d="M14.6873 22.1761C19.1311 21.9148 23.4056 19.0687 26.8864 13.931C26.9593 13.8234 27 13.7121 27 13.5797C27 13.4535 26.965 13.3481 26.8956 13.2455C25.5579 11.2677 24.1025 9.62885 22.5652 8.34557L21.506 10.2052C22.3887 10.9653 23.2531 11.87 24.0894 12.9239C24.3904 13.3032 24.3904 13.8561 24.0894 14.2354C21.5676 17.4135 18.7903 19.2357 16.0254 19.827L14.6873 22.1761Z" fill="#bbb"></path></g>
      </svg>
    ) : (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        <circle cx="12" cy="12" r="3" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle>
      </svg>
    )}
  </span>
);
const TeacherIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="#bbb" strokeWidth="2" d="M12 2l7 4-7 4-7-4 7-4Zm0 8v12m0 0l7-4m-7 4l-7-4"/></svg>
);

const StudentSignup = ({ onSwitch, onModeChange, onSuccess }) => {
  const [form, setForm] = useState({
    username: '',
    studentID: '',
    phone: '',
    password: '',
    email: '',
    teacherID: ''
  });
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Validation
    if (!form.username.trim() ||
        !form.studentID.trim() ||
        !form.phone.trim() ||
        !form.email.trim() ||
        !form.password.trim() ||
        !form.teacherID.trim()) {
      toast.error('Please fill in all fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!/^[0-9]{10}$/.test(form.phone.replace(/\D/g, ""))) {
      toast.error('Please enter a valid 10-digit phone number.');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    // Real API call
    try {
      const res = await axios.post('http://localhost:3000/api/auth/student-signup', form);
      if (onSuccess && res.data.student) {
        toast.success('Signup successful!');
        onSuccess(res.data.student);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <>
      <Navbar active="Attendance" showLinks={false} currentRole="student" />
      <div className={styles['signup-bg']}>
        <div className={styles['signup-card']}>
          <div className={styles['signup-title']}>Student Signup</div>
          <div className={styles['signup-subtitle']}>Create your account to get started.</div>
          <div className={styles['toggle-row']}>
            <button type="button" className={role === 'teacher' ? `${styles['toggle-btn']} ${styles['active']}` : styles['toggle-btn']} onClick={() => { setRole('teacher'); onSwitch && onSwitch('teacher'); }}>Teacher</button>
            <button type="button" className={role === 'student' ? `${styles['toggle-btn']} ${styles['active']}` : styles['toggle-btn']} onClick={() => setRole('student')}>Student</button>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <label className={styles['signup-label']}>Username</label>
            <div className={styles['input-row']}><UserIcon /><input name="username" placeholder="your_username" value={form.username} onChange={handleChange} /></div>
            <label className={styles['signup-label']}>Student ID</label>
            <div className={styles['input-row']}><IdIcon /><input name="studentID" placeholder="Enter your student ID" value={form.studentID} onChange={handleChange} /></div>
            <label className={styles['signup-label']}>Phone</label>
            <div className={styles['input-row']}><PhoneIcon /><input name="phone" placeholder="+91 12345 67890" value={form.phone} onChange={handleChange} /></div>
            <label className={styles['signup-label']}>Email</label>
            <div className={styles['input-row']}><EmailIcon /><input name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} /></div>
            <label className={styles['signup-label']}>Password</label>
            <div className={styles['input-row']}>
              <LockIcon />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                style={{ flex: 1 }}
              />
              <EyeIcon open={showPassword} onClick={() => setShowPassword((v) => !v)} />
            </div>
            <label className={styles['signup-label']}>Teacher ID</label>
            <div className={styles['input-row']}><TeacherIcon /><input name="teacherID" placeholder="Enter your teacher's ID" value={form.teacherID} onChange={handleChange} /></div>
            <button className={styles['signup-btn']} type="submit">Sign Up</button>
          </form>
          <div className={styles['signup-footer']}>
            Already have an account?
            <span style={{ color: '#7c19e5', fontWeight: 600, marginLeft: 4, cursor: 'pointer' }} onClick={() => onModeChange && onModeChange('login')}>Login</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentSignup; 