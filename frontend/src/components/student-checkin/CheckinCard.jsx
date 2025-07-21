import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const CheckinCard = () => {
  const [roll, setRoll] = useState('');
  const [photo, setPhoto] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [prediction, setPrediction] = useState('');
  const videoRef = useRef();
  const canvasRef = useRef();
  let stream = null;

  const handleCaptureClick = async () => {
    setShowCamera(true);
    setPhoto(null);
    setSubmitted(false);
    setPrediction('');
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      alert('Could not access camera.');
      setShowCamera(false);
    }
  };

  const handleTakePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setPhoto(canvas.toDataURL('image/png'));
      setShowCamera(false);
      if (video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setPrediction('');
    if (!photo) return;
    // Send photo to backend for prediction
    try {
      // Convert base64 to blob
      const res = await fetch(photo);
      const blob = await res.blob();
      const formData = new FormData();
      formData.append('file', blob, 'capture.png');
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setPrediction(data.emotion);
      // After prediction, mark attendance as Present and store mood
      if (data.emotion === 'No face detected') {
        toast.error('No face detected. Please try again.');
        return;
      }
      // Check if today's attendance is already marked for this student
      try {
        const checkRes = await fetch(`http://localhost:3000/api/auth/attendance/check?studentId=${encodeURIComponent(roll)}`);
        const checkData = await checkRes.json();
        if (checkData && checkData.alreadyMarked) {
          toast.error('Attendance already marked for today!');
          return;
        }
      } catch (err) {
        // If check fails, allow marking (fail open)
      }
      if (roll) {
        try {
          const attRes = await fetch('http://localhost:3000/api/auth/attendance/mark', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId: roll, status: 'Present', mood: data.emotion }),
          });
          const attData = await attRes.json();
          if (attData.success) {
            toast.success('Attendance marked successfully!');
            // Reset form fields after successful attendance
            setRoll('');
            setPhoto(null);
            setPrediction('');
            setSubmitted(false);
            setShowCamera(false);
          } else {
            toast.error(attData.message || 'Failed to mark attendance');
          }
        } catch (err) {
          toast.error('Error marking attendance');
        }
      }
    } catch (error) {
      setPrediction('Error connecting to backend');
    }
  };

  return (
    <form className="bg-white rounded-2xl shadow-xl px-10 py-10 w-full max-w-md flex flex-col items-center" onSubmit={handleSubmit}>
      <h1 className="text-3xl font-extrabold mb-2 text-center">Student Check-In</h1>
      <p className="text-gray-500 mb-7 text-center">Please enter your roll number to proceed.</p>
      <input
        type="text"
        placeholder="Enter your Roll Number"
        className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-200 text-lg"
        value={roll}
        onChange={e => setRoll(e.target.value)}
        required
      />
      {!photo && !showCamera && (
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-bold text-lg py-3 rounded-full shadow-md transition mb-2"
          onClick={handleCaptureClick}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="7" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="13.5" r="3" stroke="currentColor" strokeWidth="2" />
            <path d="M5.5 7V5.5A2.5 2.5 0 018 3h8a2.5 2.5 0 012.5 2.5V7" stroke="currentColor" strokeWidth="2" />
          </svg>
          Capture Photo
        </button>
      )}
      {showCamera && (
        <div className="flex flex-col items-center w-full mb-4">
          <video ref={videoRef} className="rounded-xl border border-gray-200 w-48 h-48 object-cover mb-2" autoPlay playsInline />
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-bold text-lg py-2 rounded-full shadow-md transition"
            onClick={handleTakePhoto}
          >
            Take Photo
          </button>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
      {photo && (
        <>
          <img src={photo} alt="Preview" className="w-32 h-32 object-cover rounded-xl mb-4 border border-gray-200" />
          <div className="w-full flex flex-row items-center gap-2 mb-2">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-bold text-lg py-3 rounded-full shadow-md transition"
            >
              Submit
            </button>
            <button
              type="button"
              className="flex items-center justify-center rounded-full p-2 bg-transparent transition shadow-none"
              title="Refresh"
              onClick={() => {
                setRoll('');
                setPhoto(null);
                setPrediction('');
                setSubmitted(false);
                setShowCamera(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 48 48" stroke="#2196f3" strokeWidth="3">
                <path d="M36 24a12 12 0 1 0-4.22 9.14" stroke="#2196f3" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="36 28 36 24 32 24" stroke="#2196f3" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </>
      )}
      {prediction && (
        <div className="text-blue-600 font-semibold mt-2">Predicted Emotion: <strong>{prediction}</strong></div>
      )}
    </form>
  );
};

export default CheckinCard; 