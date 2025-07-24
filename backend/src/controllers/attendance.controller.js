import Student from "../models/student.model.js";

export const markAttendance = async (req, res) => {
  console.log('MARK ATTENDANCE CALLED'); // Confirm function is called
  const { studentId, status, mood, moodScore } = req.body;
  console.log('Attendance mark payload:', req.body); // Log incoming request
  try {
    const now = new Date();
    const date = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    let update = { $inc: { totalClass: 1 } };
    if (status === "Present") {
      update.$inc.totalAttendance = 1;
    } else if (status === "Late") {
      update.$inc.totalAttendance = 0.5;
    }
    // Debug log for moodScore value and type
    console.log('moodScore value:', moodScore, 'type:', typeof moodScore);
    let moodScoreToSave = moodScore !== undefined ? Number(moodScore) : 0;
    if (isNaN(moodScoreToSave)) {
      moodScoreToSave = 0;
      console.log('moodScore was invalid, using 0');
    }
    // Also push to attendance array
    update.$push = {
      attendance: {
        date: now,
        status,
        time,
        mood: mood || '-',
        moodScore: moodScoreToSave
      }
    };
    console.log('Attendance update object:', update); // Log update object
    const student = await Student.findOneAndUpdate(
      { studentID: studentId },
      update,
      { new: true }
    );
    console.log('Student after update:', student);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.json({ success: true, student });
  } catch (err) {
    console.error('Error in markAttendance:', err);
    res.status(500).json({ success: false, message: "Error marking attendance", error: err.message });
  }
};

// Endpoint to check if today's attendance is already marked for a student
export const checkAttendanceMarked = async (req, res) => {
  const { studentId } = req.query;
  if (!studentId) return res.status(400).json({ alreadyMarked: false, message: 'No studentId provided' });

  const student = await Student.findOne({ studentID: studentId });
  if (!student) return res.status(404).json({ alreadyMarked: false, message: 'Student not found' });

  const today = new Date().toISOString().slice(0, 10);
  const alreadyMarked = Array.isArray(student.attendance) &&
    student.attendance.some(record => new Date(record.date).toISOString().slice(0, 10) === today);

  return res.json({ alreadyMarked });
}; 