import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String },
  studentID: { type: String },
  phone: { type: String },
  profilePic: { type: String },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "student"],
    default: "student",
  },
  teacherID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  classSection: {
    type: String,
    required: true,
  },
  isActive: { type: Boolean, default: true },
  attendance: [
    {
      date: { type: Date },
      status: { type: String, enum: ["present", "absent", "late"] },
      mood: { type: String, default: '-' },
      moodScore: { type: Number },
    },
  ],
  totalAttendance: {
    type: Number,
    default: 0,
  },
  totalClass: {
    type: Number,
    default: 0,
  },
  moodAvg: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });


// 🔁 Pre-save hook to update moodAvg before saving
studentSchema.pre('save', function (next) {
    if (Array.isArray(this.attendance) && this.attendance.length > 0) {
      const moodSum = this.attendance.reduce((sum, record) => {
        return sum + (typeof record.moodScore === 'number' ? record.moodScore : 0);
      }, 0);
      const moodCount = this.attendance.filter(r => typeof r.moodScore === 'number').length;
      this.moodAvg = moodCount > 0 ? moodSum / moodCount : 0;
    } else {
      this.moodAvg = 0;
    }
    next();
  });
  

const Student = mongoose.model("Student", studentSchema);
export default Student;
