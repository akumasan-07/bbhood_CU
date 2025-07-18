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
        required: true
    },
    isActive: { type: Boolean, default: true },
    attendance: [{
        date: { type: Date },
        status: { type: String, enum: ["present", "absent", "late"] }
    }],
    totalAttendance: {
      type: Number,
      default: 0
    },
    totalClass: {
      type: Number,
      default: 0
    },
},{timestamps:true});

const Student = mongoose.model("Student", studentSchema);
export default Student;