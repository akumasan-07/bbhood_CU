import React, { useRef, useState } from 'react';

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
    } catch (error) {
      setPrediction('Error connecting to backend');
    }
  };

  return (
    <form className="bg-white rounded-2xl shadow-xl px-10 py-10 w-full max-w-md flex flex-col items-center" onSubmit={handleSubmit}>
      <h1 className="text-3xl font-extrabold mb-2 text-center">Student Check-In</h1>
      <p className="text-gray-500 mb-7 text-center">Please enter your roll number to proceed.</p>
      <input
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Enter your Roll Number"
        className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-200 text-lg"
        value={roll}
        onChange={e => setRoll(e.target.value.replace(/[^0-9]/g, ''))}
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
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-bold text-lg py-3 rounded-full shadow-md transition mb-2"
          >
            Submit
          </button>
        </>
      )}
      {prediction && (
        <div className="text-blue-600 font-semibold mt-2">Predicted Emotion: <strong>{prediction}</strong></div>
      )}
      {submitted && !prediction && (
        <div className="text-green-600 font-semibold mt-2">Photo submitted! (Backend integration coming soon)</div>
      )}
    </form>
  );
};

export default CheckinCard; 