// import React from 'react';

// const FlaggedInstancesTable = ({ flagged }) => (
//   <div className="sd-flagged-table">
//     <div className="font-bold text-lg mb-4">Flagged Instances</div>
//     <div style={{overflowX: 'auto'}}>
//       <table className="sd-table">
//         <thead>
//           <tr>
//             <th>DATE</th>
//             <th>DESCRIPTION</th>
//           </tr>
//         </thead>
//         <tbody>
//           {flagged.map((row, i) => (
//             <tr key={i}>
//               <td>{row.date}</td>
//               <td>{row.desc}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );

// export default FlaggedInstancesTable; 

import React from 'react';

const FlaggedInstancesTable = ({ flagged }) => (
  <div className="sd-flagged-table">
    <div className="font-bold text-lg mb-4">Flagged Instances</div>
    <div style={{ overflowX: 'auto' }}>
      <table className="sd-table">
        <thead>
          <tr>
            <th>DATE</th>
            <th>MOOD SCORE</th>
          </tr>
        </thead>
        <tbody>
          {flagged.length === 0 ? (
            <tr>
              <td colSpan="2" style={{ textAlign: 'center', padding: '1rem', color: '#888' }}>
                No flagged instances found.
              </td>
            </tr>
          ) : (
            flagged.map((row, i) => (
              <tr key={i}>
                <td>{row.date ? new Date(row.date).toLocaleDateString() : 'N/A'}</td>
                <td>{typeof row.moodScore === 'number' ? row.moodScore : 'N/A'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default FlaggedInstancesTable;
