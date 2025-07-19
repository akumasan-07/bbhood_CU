import React from "react";

const StudentDashboard = () => {
  const attendanceData = [
    { date: "2024-07-26", checkIn: "08:02 AM", status: "Present" },
    { date: "2024-07-25", checkIn: "08:05 AM", status: "Present" },
    { date: "2024-07-24", checkIn: "--", status: "Absent" },
    { date: "2024-07-23", checkIn: "07:58 AM", status: "Present" },
    { date: "2024-07-22", checkIn: "08:10 AM", status: "Late" },
    { date: "2024-07-21", checkIn: "08:01 AM", status: "Present" },
  ];

  const statusStyles = {
    Present: "bg-green-100 text-green-800",
    Absent: "bg-red-100 text-red-800",
    Late: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 px-10 py-4 shadow-sm">
          <div className="flex items-center gap-4 text-gray-900">
            <svg className="h-8 w-8 text-[var(--primary-500)]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" fill="currentColor" fillRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"/>
            </svg>
            <h1 className="text-xl font-bold leading-tight tracking-[-0.015em] text-gray-900">EduMind Analytics</h1>
          </div>
          <div className="flex flex-1 justify-end items-center gap-4">
            <p className="text-sm font-semibold text-gray-700">Priya Sharma</p>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuAf_nbHC7rmp-jYmLhUEmDck52E71MzwG3yFhR4E_tEyOMK893gFzsHYTVzv0mww_UaIv8a5nyuOX5EsYtpNB-in5LHR-W8oTMfHWJVIBDLRw1goSPvDoy5xGq9V5cuPs5Ktx-aMoECkx7jOtPlUomBnmb4Dnw9S0bknlaUMkwXbTygPOWBK9dvQnXYEJwhZgE2O3XADABr2QkRua-dVeLxT2XlSRB1VAbM3NpmoA17lkpNkW8XalsTOWJm2UZRO-eCJz0_nzzqWEk)' }}></div>
          </div>
        </header>

        <main className="px-10 py-8 lg:px-20 xl:px-40">
          <div className="layout-content-container flex flex-col max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">My Attendance</h1>
              <p className="text-gray-500 mt-1">A record of your attendance.</p>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-gray-900 mb-4">Summary</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 rounded-2xl p-6 border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <p className="text-gray-600 text-sm font-medium leading-normal">Overall Attendance</p>
                  <p className="text-gray-900 tracking-tight text-3xl font-bold leading-tight">92%</p>
                  <p className="text-red-600 text-sm font-medium leading-normal flex items-center gap-1">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.47 11.53a.75.75 0 1 1 1.06-1.06l3.22 3.22V3.75A.75.75 0 0 1 10 3z"/></svg>
                    <span>-3% from last week</span>
                  </p>
                </div>
                <div className="flex flex-col gap-2 rounded-2xl p-6 border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <p className="text-gray-600 text-sm font-medium leading-normal">Days Absent</p>
                  <p className="text-gray-900 tracking-tight text-3xl font-bold leading-tight">4</p>
                  <p className="text-gray-500 text-sm font-medium leading-normal flex items-center gap-1">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM10 11a6 6 0 0 1 6 6H4a6 6 0 0 1 6-6z" fillRule="evenodd"/></svg>
                    <span>in the last 30 days</span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-gray-900 mb-4">Attendance Log</h2>
              <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Check-in Time</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {attendanceData.map(({ date, checkIn, status }) => (
                      <tr key={date}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{checkIn}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>{status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
