import React from 'react';

const FlaggedInstancesTable = ({ flagged }) => (
  <div className="sd-flagged-table">
    <div className="font-bold text-lg mb-4">Flagged Instances</div>
    <div style={{overflowX: 'auto'}}>
      <table className="sd-table">
        <thead>
          <tr>
            <th>DATE</th>
            <th>DESCRIPTION</th>
          </tr>
        </thead>
        <tbody>
          {flagged.map((row, i) => (
            <tr key={i}>
              <td>{row.date}</td>
              <td>{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default FlaggedInstancesTable; 