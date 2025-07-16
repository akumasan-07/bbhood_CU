import React, { useState, useRef, useEffect } from 'react';
import styles from '../components_css/Navbar.module.css';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ active = 'Attendance', user, showLinks = true, currentRole }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleAvatarClick = () => {
    if (!showLinks) setDropdownOpen((open) => !open);
  };

  const handleSelect = (role) => {
    setDropdownOpen(false);
    if (role === 'teacher') navigate('/teacher/signup');
    if (role === 'student') navigate('/student/signup');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <span className={styles.logoIcon}>⦿</span>
        <span className={styles.logoText}>Campus Check-In</span>
      </div>
      <div className={styles.rightSection}>
        {showLinks && <>
          <a className={styles.link + ' ' + (active === 'Dashboard' ? styles.active : '')} href="#">Dashboard</a>
          <a className={styles.link + ' ' + (active === 'Attendance' ? styles.active : '')} href="#">Attendance</a>
          <a className={styles.link + ' ' + (active === 'Reports' ? styles.active : '')} href="#">Reports</a>
        </>}
        <div className={styles.avatarWrapper} ref={avatarRef}>
          {/* User icon instead of image */}
          <span className={styles.avatar} onClick={handleAvatarClick} style={{ cursor: !showLinks ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 