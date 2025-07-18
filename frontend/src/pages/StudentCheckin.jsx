import React from 'react';
import Header from '../components/student-checkin/Header';
import CheckinCard from '../components/student-checkin/CheckinCard';

const StudentCheckin = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-blue-100 to-yellow-100 text-[var(--text-primary)]">
      <Header />
      <div className="flex justify-center items-center min-h-[70vh]">
        <CheckinCard />
      </div>
    </div>
  );
};

export default StudentCheckin; 