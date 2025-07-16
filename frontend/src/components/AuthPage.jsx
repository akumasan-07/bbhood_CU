import React, { useState } from 'react';
import TeacherSignup from './TeacherSignup';
import TeacherLogin from './TeacherLogin';
import StudentSignup from './StudentSignup';
import StudentLogin from './StudentLogin';
import AuthSwitcher from './AuthSwitcher';

const AuthPage = () => {
  // role: 'teacher' or 'student', mode: 'signup' or 'login'
  const [role, setRole] = useState('teacher');
  const [mode, setMode] = useState('signup');

  const handleSwitch = (newRole) => {
    setRole(newRole);
    setMode('signup'); // default to signup when switching role
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  let FormComponent = null;
  if (role === 'teacher' && mode === 'signup') {
    FormComponent = <TeacherSignup onSwitch={handleSwitch} onModeChange={handleModeChange} />;
  } else if (role === 'teacher' && mode === 'login') {
    FormComponent = <TeacherLogin onSwitch={handleSwitch} onModeChange={handleModeChange} />;
  } else if (role === 'student' && mode === 'signup') {
    FormComponent = <StudentSignup onSwitch={handleSwitch} onModeChange={handleModeChange} />;
  } else if (role === 'student' && mode === 'login') {
    FormComponent = <StudentLogin onSwitch={handleSwitch} onModeChange={handleModeChange} />;
  }

  return (
    <div>
      {FormComponent}
      <div style={{ marginTop: 20 }}>
        <button onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}>
          {mode === 'signup' ? 'Go to Login' : 'Go to Signup'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage; 