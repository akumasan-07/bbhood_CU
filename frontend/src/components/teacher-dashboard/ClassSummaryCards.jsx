import React from 'react';

const ClassSummaryCards = ({ students = [], moodDeviationCount = 0 }) => {

  // Calculate total attendance and total classes
  const totalAttendance = students.reduce((sum, s) => sum + (typeof s.totalAttendance === 'number' ? s.totalAttendance : 0), 0);
  const totalClasses = students.reduce((sum, s) => sum + (typeof s.totalClass === 'number' ? s.totalClass : 0), 0);
  // Calculate average attendance percentage
  const avgAttendance = totalClasses > 0 ? Math.round((totalAttendance / totalClasses) * 100) : 0;
  
  // Calculate average mood score for the class
  const calculateAvgMood = () => {
    let totalMoodScore = 0;
    let totalStudentsWithMood = 0;
    
    console.log('Students data for mood calculation:', students);
    
    students.forEach(student => {
      console.log('Processing student:', student.name, 'Attendance:', student.attendance);
      if (Array.isArray(student.attendance)) {
        // Get today's attendance records with moodScore
        const today = new Date().toISOString().slice(0, 10);
        console.log('Today:', today);
        const todayRecords = student.attendance.filter(a => {
          const d = a.date ? new Date(a.date).toISOString().slice(0, 10) : '';
          const hasMoodScore = typeof a.moodScore === 'number';
          console.log('Record date:', d, 'Has mood score:', hasMoodScore, 'Mood score:', a.moodScore);
          return d === today && hasMoodScore;
        });
        
        console.log('Today records with mood:', todayRecords);
        
        if (todayRecords.length > 0) {
          // Calculate average mood score for this student today
          const studentAvgMood = todayRecords.reduce((sum, a) => sum + a.moodScore, 0) / todayRecords.length;
          console.log('Student avg mood:', studentAvgMood);
          totalMoodScore += studentAvgMood;
          totalStudentsWithMood++;
        }
      }
    });
    
    console.log('Total mood score:', totalMoodScore, 'Total students with mood:', totalStudentsWithMood);
    const result = totalStudentsWithMood > 0 ? (totalMoodScore / totalStudentsWithMood).toFixed(1) : '0.0';
    console.log('Final avg mood score:', result);
    return result;
  };
  
  const avgMoodScore = calculateAvgMood();

  return (
    <div className="mb-8">
      <h2 className="tdb-header" style={{fontSize: '1.3rem', fontWeight: 700, marginBottom: '1em'}}>Class Summary</h2>
      <div style={{display: 'flex', gap: '24px', flexWrap: 'wrap'}}>
        <div className="tdb-support" style={{flex: 1, minWidth: 220}}>
          <p style={{color: '#724e97', fontWeight: 500, fontSize: '1rem'}}>Class Attendance</p>
          <p style={{color: '#140e1b', fontWeight: 700, fontSize: '2.2rem'}}>{avgAttendance}%</p>
          <p style={{color: '#e53935', fontWeight: 500, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 4}}>
            <span style={{fontSize: '1.2em', marginRight: 4}}>↓</span>
            -3% from last week
          </p>
        </div>
        <div className="tdb-support" style={{flex: 1, minWidth: 220}}>
          <p style={{color: '#724e97', fontWeight: 500, fontSize: '1rem'}}>Average Mood Score</p>
          <p style={{color: '#140e1b', fontWeight: 700, fontSize: '2.2rem'}}>{avgMoodScore}/5</p>
          <p className={Number(avgMoodScore) > 3.5 ? "tdb-mood-positive" : Number(avgMoodScore) > 2.5 ? "" : "tdb-mood-negative"} 
             style={{fontWeight: 500, fontSize: '1rem', 
             color: Number(avgMoodScore) > 3.5 ? '#059669' : Number(avgMoodScore) > 2.5 ? '#b45309' : '#e53935', 
             display: 'flex', alignItems: 'center', gap: 4}}>
            <span style={{fontSize: '1.2em', marginRight: 4}}>{Number(avgMoodScore) > 3.5 ? '↑' : Number(avgMoodScore) > 2.5 ? '→' : '↓'}</span>
            {Number(avgMoodScore) > 3.5 ? 'Positive mood today' : Number(avgMoodScore) > 2.5 ? 'Neutral mood today' : 'Needs attention'}
          </p>
        </div>
        <div className="tdb-support" style={{flex: 1, minWidth: 220}}>
  <p style={{color: '#724e97', fontWeight: 500, fontSize: '1rem'}}>Notable Mood Deviations</p>
  <p style={{color: '#140e1b', fontWeight: 700, fontSize: '2.2rem'}}>{moodDeviationCount}</p>
  <p style={{color: '#888', fontWeight: 500, fontSize: '1rem'}}>with mood deviations today</p>
</div>

      </div>
    </div>
  );
};

export default ClassSummaryCards;