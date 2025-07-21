import Student from "../models/student.model.js";

export const markAttendance = async (req, res) => {
  const { studentId, status } = req.body;
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
        time
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