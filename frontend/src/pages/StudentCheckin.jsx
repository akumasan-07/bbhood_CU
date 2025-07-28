import React, { useRef, useState } from 'react';
import Header from '../components/student-checkin/Header';

const StudentCheckin = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [imageCaptured, setImageCaptured] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePhotoClick = async () => {
    setErrorMessage('');
    setCameraOpen(true);
    setImageCaptured(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvasRef.current.toDataURL('image/png');
      setImageCaptured(dataUrl);
      setErrorMessage('');
      stopCamera();
      setCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleRetake = () => {
    setImageCaptured(null);
    handlePhotoClick();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageCaptured) {
      setErrorMessage('Please capture a photo before submitting.');
      return;
    }

    setErrorMessage('');
    console.log('Form submitted');
    console.log('Captured image data:', imageCaptured);
  };

  return (
    <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-yellow-100 text-[var(--text-primary)] min-h-screen flex flex-col relative">
      <Header />

      <main className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-8 p-10 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--text-primary)]">Attendance Check-in</h2>
            <p className="mt-2 text-center text-sm text-[var(--text-secondary)]">
              Click your photo for attendance. You can also share a thought.
            </p>
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

              {/* Camera Panel */}
              {cameraOpen && (
                <div className="mt-4 space-y-4 text-center">
                  <video ref={videoRef} className="w-full rounded-xl border border-gray-300" autoPlay playsInline />
                  <button
                    type="button"
                    onClick={handleCapture}
                    className="py-2 px-6 text-white bg-green-600 hover:bg-green-700 rounded-full font-semibold shadow"
                  >
                    Capture
                  </button>
                </div>
              )}

              {/* Captured Image */}
              {imageCaptured && (
                <div className="mt-4 space-y-4 text-center">
                  <img src={imageCaptured} alt="Captured" className="rounded-xl mx-auto max-h-80 border border-gray-300" />
                  <button
                    type="button"
                    onClick={handleRetake}
                    className="py-2 px-6 text-white bg-yellow-600 hover:bg-yellow-700 rounded-full font-semibold shadow"
                  >
                    Retake Photo
                  </button>
                </div>
              )}

              {/* Thought Input */}
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
                <p className="mt-2 text-xs text-[var(--text-secondary)]">
                  Your thoughts help us understand the campus sentiment.
                </p>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-600 text-sm font-medium text-center">{errorMessage}</p>
            )}

            {/* Submit */}
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
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default StudentCheckin;
