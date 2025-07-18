import React from 'react';

const StudentHeader = ({ name, className }) => (
  <div style={{display:'flex',alignItems:'center',gap:20}}>
    <div className="sd-header-avatar">{name[0]}</div>
    <div>
      <h1 className="sd-header-title">Student Report - {name}</h1>
      <div className="sd-header-class">Class {className}</div>
    </div>
  </div>
);

export default StudentHeader; 