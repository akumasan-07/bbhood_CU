import React, { useState, useRef, useEffect } from 'react';
import styles from '../components_css/Navbar.module.css';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ active = 'Attendance', user, showLinks = true, currentRole, onNavClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const avatarRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
        setProfileDropdownOpen(false);
      }
    }
    if (dropdownOpen || profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen, profileDropdownOpen]);

  const handleAvatarClick = () => {
    if (!showLinks) setDropdownOpen((open) => !open);
  };

  const handleProfileClick = () => {
    if (showLinks) setProfileDropdownOpen((open) => !open);
  };
  const handleLogout = () => {
    // Placeholder: Add your logout logic here (clear tokens, redirect, etc.)
    alert('Logged out!');
  };

  const handleSelect = (role) => {
    setDropdownOpen(false);
    if (role === 'teacher') navigate('/teacher/signup');
    if (role === 'student') navigate('/student/signup');
    if (role === 'counselor') navigate('/counselor/signup');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <span className={styles.logoIcon}>⦿</span>
        <span className={styles.logoText}>Campus Check-In</span>
      </div>
      <div className={styles.rightSection}>
        {showLinks && <>
          <a className={styles.link + ' ' + (active === 'Dashboard' ? styles.active : '')} href="#" onClick={e => { e.preventDefault(); onNavClick && onNavClick('Dashboard'); }}>Dashboard</a>
          <a className={styles.link + ' ' + (active === 'Attendance' ? styles.active : '')} href="#" onClick={e => { e.preventDefault(); onNavClick && onNavClick('Attendance'); }}>Attendance</a>
          <a className={styles.link + ' ' + (active === 'Reports' ? styles.active : '')} href="#" onClick={e => { e.preventDefault(); onNavClick && onNavClick('Reports'); }}>Reports</a>
        </>}
        <div className={styles.avatarWrapper} ref={avatarRef}>
          {/* User icon instead of image */}
          <span
            className={styles.avatar}
            onClick={showLinks ? handleProfileClick : handleAvatarClick}
            style={{ cursor: showLinks ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#f3eaff"/>
              <circle cx="12" cy="10" r="4" fill="#bda6e6"/>
              <ellipse cx="12" cy="17" rx="6" ry="3" fill="#bda6e6"/>
            </svg>
          </span>
          {!showLinks && (
            <div
              className={styles.dropdownMenu}
              hidden={!dropdownOpen}
              ref={dropdownRef}
            >
              <div className={styles.dropdownRoleToggle}>
                <button
                  className={styles.dropdownRoleBtn + ' ' + (currentRole === 'teacher' ? styles.activeRole : '')}
                  onClick={() => handleSelect('teacher')}
                >
                  Teacher
                </button>
                <button
                  className={styles.dropdownRoleBtn + ' ' + (currentRole === 'student' ? styles.activeRole : '')}
                  onClick={() => handleSelect('student')}
                >
                  Student
                </button>
                <button
                  className={styles.dropdownRoleBtn + ' ' + (currentRole === 'counselor' ? styles.activeRole : '')}
                  onClick={() => handleSelect('counselor')}
                >
                  Counselor
                </button>
              </div>
            </div>
          )}
          {/* Profile dropdown for dashboard */}
          {showLinks && profileDropdownOpen && (
            <div className={styles.dropdownMenu} style={{right: 0, top: 54, minWidth: 50, background: '#fff', borderRadius: 12, boxShadow: '0 4px 16px rgba(124,25,229,0.13)', padding: 0, border: '1px solid #e1bee7', zIndex: 300, position: 'absolute'}} ref={dropdownRef}>
              <button style={{width: '100%', padding: '12px 20px', background: 'none', border: 'none', color: '#7c19e5', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', borderRadius: 12, textAlign: 'left'}} onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 