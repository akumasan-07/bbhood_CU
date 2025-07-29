import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import '../../components_css/TeacherDashboard.css';

const CheckinCard = () => {
  const [roll, setRoll] = useState('');
  const [photo, setPhoto] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [thought, setThought] = useState('');
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
    try {
      // Convert base64 to blob
      const res = await fetch(photo);
      const blob = await res.blob();
      const formData = new FormData();
      formData.append('file', blob, 'capture.png');
      if (thought && thought.trim()) {
        formData.append('thought', thought);
      }
      // Send to Flask backend for sentiment analysis
      const response = await fetch('http://localhost:5000/analyze-sentiment', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      // Store both mood and score in prediction state as an object
      setPrediction({
        mood: data.final_class || data.emotion,
        score: data.final_score
      });
      // After prediction, mark attendance as Present and store mood and score
      if ((data.final_class || data.emotion) === 'No face detected') {
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
            body: JSON.stringify({
              studentId: roll,
              status: 'Present',
              mood: data.final_class || data.emotion,
              moodScore: data.final_score || 0
            }),
          });
          const attData = await attRes.json();
          if (attData.success) {
            toast.success('Attendance marked successfully!');
            // Reset form fields after successful attendance
            setRoll('');
            setPhoto(null);
            setPrediction('');
            setThought('');
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
    <form className="checkin-card-container" onSubmit={handleSubmit}>
      <h1 className="checkin-heading">Attendance Check-in</h1>
      <p className="checkin-subheading">Click your photo for attendance. You can also share a thought.</p>
      <div className="w-full" style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="student-id-input" className="checkin-label">
          Student ID <span style={{ color: '#f43f5e' }}>*</span>
        </label>
      <input
          id="student-id-input"
        type="text"
          className="checkin-id-input"
          placeholder="Enter your Student ID"
        value={roll}
        onChange={e => setRoll(e.target.value)}
        required
          autoComplete="off"
          style={{ marginBottom: '1.5rem' }}
      />
      </div>
      <div className="w-full" style={{ marginBottom: '1.5rem' }}>
        <label className="checkin-label">
          Attendance Photo <span style={{ color: '#f43f5e' }}>*</span>
        </label>
      {!photo && !showCamera && (
        <button
          type="button"
            className="checkin-photo-btn"
          onClick={handleCaptureClick}
        >
            <span style={{ display: 'flex', alignItems: 'center', marginRight: '0.5rem' }}>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#ede9fe' }}>
                <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
            </span>
            Click Photo
        </button>
      )}
      {showCamera && (
          <div style={{ marginTop: '1rem', marginBottom: '1rem', width: '100%' }}>
            <video ref={videoRef} className="checkin-photo-preview" autoPlay playsInline />
          <button
            type="button"
              className="checkin-photo-btn"
              style={{ background: '#22c55e', marginTop: '0.5rem' }}
            onClick={handleTakePhoto}
          >
              Capture
          </button>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
      {photo && (
          <div style={{ marginTop: '1rem', marginBottom: '1rem', width: '100%' }}>
            <img src={photo} alt="Preview" className="checkin-photo-preview" />
            <button
              type="button"
              className="checkin-retake-btn"
              onClick={() => {
                setRoll('');
                setPhoto(null);
                setPrediction('');
                setThought('');
                setSubmitted(false);
                setShowCamera(false);
              }}
            >
              Retake Photo
            </button>
          </div>
        )}
      </div>
      {/* Thought Input */}
      <div className="w-full" style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="thought-input" className="checkin-thought-label">
          Share a thought (Optional)
        </label>
        <textarea
          id="thought-input"
          name="thought"
          rows="3"
          placeholder="How are you feeling today?"
          className="checkin-thought-textarea"
          value={thought}
          onChange={e => setThought(e.target.value)}
        ></textarea>
        <p className="checkin-thought-helper">
          Your thoughts help us understand the campus sentiment.
        </p>
      </div>
      <button
        type="submit"
        className="checkin-submit-btn"
      >
        Submit
      </button>
      {prediction && prediction.mood && (
        <div style={{ color: '#2563eb', fontWeight: 600, marginTop: '1.5rem' }}>
          Predicted Emotion: <strong>{prediction.mood}</strong>
          {typeof prediction.score !== 'undefined' && (
            <span style={{ marginLeft: 12 }}>Score: <strong>{prediction.score}</strong></span>
          )}
        </div>
      )}
    </form>
  );
};

export default CheckinCard; 