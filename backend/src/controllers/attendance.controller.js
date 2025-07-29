import Student from "../models/student.model.js";

export const markAttendance = async (req, res) => {
  const { studentId, status, mood, moodScore } = req.body;
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
    // Also push to attendance array
    update.$push = {
      attendance: {
        date: now,
        status,
        time,
        mood: mood || '-', // Store mood if provided, else '-'
        moodScore: typeof moodScore === 'number' ? moodScore : undefined // Store moodScore if provided
      }
    };
    const student = await Student.findOneAndUpdate(
      { studentID: studentId },
      update,
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.json({ success: true, student });
  } catch (err) {
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