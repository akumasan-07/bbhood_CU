import React from 'react';

const FlaggedInstancesTable = ({ flagged }) => (
  <div className="mb-8">
    <div className="font-bold text-lg mb-4">Flagged Instances</div>
    <div className="rounded-xl border border-gray-200 bg-white overflow-x-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr className="text-gray-400 text-sm">
            <th className="py-3 px-4 font-medium">DATE</th>
            <th className="py-3 px-4 font-medium">DESCRIPTION</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {flagged.map((row, i) => (
            <tr key={i}>
              <td className="py-3 px-4 text-gray-700">{row.date}</td>
              <td className="py-3 px-4 text-gray-700">{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default FlaggedInstancesTable; 