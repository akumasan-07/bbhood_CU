import React from 'react';

const StudentHeader = ({ name, className }) => (
  <div>
    <h1 className="text-3xl font-bold mb-1">Student Report - {name}</h1>
    <div className="text-purple-400 font-semibold mb-8">Class {className}</div>
  </div>
);

export default StudentHeader; 