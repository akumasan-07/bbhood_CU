import React from 'react';

const AuthSwitcher = ({ onSwitch, currentRole }) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <button onClick={() => onSwitch('teacher')} disabled={currentRole === 'teacher'}>
        Teacher
      </button>
      <button onClick={() => onSwitch('student')} disabled={currentRole === 'student'} style={{ marginLeft: 10 }}>
        Student
      </button>
    </div>
  );
};

export default AuthSwitcher; 