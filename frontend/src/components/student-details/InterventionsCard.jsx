import React from 'react';

const InterventionsCard = ({ interventions }) => (
  <div className="sd-interventions-card">
    <div className="font-bold text-lg mb-4">Interventions/Support</div>
    <div>
      Student received counseling on <span style={{fontWeight:'bold'}}>{interventions[0]}</span> and <span style={{fontWeight:'bold'}}>{interventions[1]}</span>. No further interventions are currently scheduled.
    </div>
  </div>
);

export default InterventionsCard; 