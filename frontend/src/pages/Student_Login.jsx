import React from 'react';

const StudentCheckin = () => {
  const handlePhotoClick = () => {
    // TODO: Implement photo capture logic
    console.log('Photo button clicked');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log('Form submitted');
  };

  return (
    <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-yellow-100 text-[var(--text-primary)] min-h-screen flex flex-col relative">
      <header className="w-full bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto flex items-center justify-between whitespace-nowrap border-b border-solid border-[var(--border-color)] px-6 py-4">
          <div className="flex items-center gap-3">
            <svg className="h-8 w-8 text-[var(--brand-primary)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z" />
            </svg>
            <h1 className="text-xl font-bold">Campus Check-In</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium hover:text-[var(--brand-primary)] transition-colors" href="#">Dashboard</a>
            <a className="text-sm font-medium text-[var(--brand-primary)] border-b-2 border-[var(--brand-primary)] pb-1" href="#">Attendance</a>
            <a className="text-sm font-medium hover:text-[var(--brand-primary)] transition-colors" href="#">Reports</a>
            <a className="text-sm font-medium hover:text-[var(--brand-primary)] transition-colors" href="#">Settings</a>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ml-4"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAvjIgKp9P2tnW-CZrdwIgBncypOZrEi567zg0XwwMecJSc4GyUWlDMQwP6YN6gn2VBx9A6gB-ZlL6dsjt281op03ds613J_JSyutsoLs3IjNij3ssAEwuzdTDLLHXKTOEgfstL5dRc164iAu2K0aqxcJdfqWKG5sPArc_WK09HT5buxccrPe62NaIDILLo1Z5O7eyYUy6Mwyscg-KCADA7Zy6YirNBNvHH8dGB0oH_1ETiKci71yJRS8D6YSPN3UjBX5xXO7MUOc0")`
              }}
            ></div>
          </nav>
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16m-7 6h7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-8 p-10 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--text-primary)]">Attendance Check-in</h2>
            <p className="mt-2 text-center text-sm text-[var(--text-secondary)]">Click your photo for attendance. You can also share a thought.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)]">
                  Attendance Photo <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={handlePhotoClick}
                  className="group mt-2 relative flex w-full justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                    <svg className="h-6 w-6 text-purple-300 group-hover:text-purple-100 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </span>
                  Click Photo
                </button>
              </div>

              <div>
                <label htmlFor="thought-input" className="block text-sm font-medium text-[var(--text-primary)]">
                  Share a thought (Optional)
                </label>
                <div className="mt-2">
                  <textarea
                    id="thought-input"
                    name="thought"
                    rows="3"
                    placeholder="How are you feeling today?"
                    className="appearance-none block w-full px-4 py-3 border border-[var(--border-color)] placeholder-[var(--text-secondary)] text-[var(--text-primary)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent sm:text-sm transition-all duration-300"
                  ></textarea>
                </div>
                <p className="mt-2 text-xs text-[var(--text-secondary)]">Your thoughts help us understand the campus sentiment.</p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-full text-white bg-purple-800 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default StudentCheckin;
