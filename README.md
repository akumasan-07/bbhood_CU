# Attendance Project

## Backend (Flask API for Emotion Detection)

1. Place your trained model file `model_new.h5` in a folder named `src` at the project root (i.e., `Attendance/src/model_new.h5`).
2. Install backend dependencies:
   ```bash
   pip install flask flask-cors tensorflow opencv-python
   ```
3. Run the backend server:
   ```bash
   python backend/app.py
   ```

The backend will be available at `http://localhost:5000/predict`.

## Frontend

See the frontend README or run as usual with `npm start` inside the `frontend` directory.