import React from 'react';

const ClassSummaryCards = () => (
  <div className="mb-8">
    <h2 className="tdb-header" style={{fontSize: '1.3rem', fontWeight: 700, marginBottom: '1em'}}>Class Summary</h2>
    <div style={{display: 'flex', gap: '24px', flexWrap: 'wrap'}}>
      <div className="tdb-support" style={{flex: 1, minWidth: 220}}>
        <p style={{color: '#724e97', fontWeight: 500, fontSize: '1rem'}}>Class Attendance</p>
        <p style={{color: '#140e1b', fontWeight: 700, fontSize: '2.2rem'}}>92%</p>
        <p style={{color: '#e53935', fontWeight: 500, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 4}}>
          <span style={{fontSize: '1.2em', marginRight: 4}}>↓</span>
          -3% from last week
        </p>
      </div>
      <div className="tdb-support" style={{flex: 1, minWidth: 220}}>
        <p style={{color: '#724e97', fontWeight: 500, fontSize: '1rem'}}>Average Mood Score</p>
        <p style={{color: '#140e1b', fontWeight: 700, fontSize: '2.2rem'}}>3.8/5</p>
        <p className="tdb-mood-positive" style={{fontWeight: 500, fontSize: '1rem', color: '#059669', display: 'flex', alignItems: 'center', gap: 4}}>
          <span style={{fontSize: '1.2em', marginRight: 4}}>↑</span>
          +0.2 from last week
        </p>
      </div>
      <div className="tdb-support" style={{flex: 1, minWidth: 220}}>
        <p style={{color: '#724e97', fontWeight: 500, fontSize: '1rem'}}>Notable Mood Deviations</p>
        <p style={{color: '#140e1b', fontWeight: 700, fontSize: '2.2rem'}}>3</p>
        <p style={{color: '#888', fontWeight: 500, fontSize: '1rem'}}>students flagged today</p>
      </div>
    </div>
  </div>
);

export default ClassSummaryCards; 