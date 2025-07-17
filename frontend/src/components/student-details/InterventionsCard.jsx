import React from 'react';

const InterventionsCard = ({ interventions }) => (
  <div className="mb-8">
    <div className="font-bold text-lg mb-4">Interventions/Support</div>
    <div className="rounded-xl border border-gray-200 bg-white p-5 text-gray-600">
      Student received counseling on <span className="font-bold">{interventions[0]}</span> and <span className="font-bold">{interventions[1]}</span>. No further interventions are currently scheduled.
    </div>
  </div>
);

export default InterventionsCard; 