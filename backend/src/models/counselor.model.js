import mongoose from "mongoose";

const counselorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
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
    counselorID: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["counselor"],
        default: "counselor",
    },
    isActive: { type: Boolean, default: true },
    flaggedStudents: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Student'
        }
      ]
},{timestamps: true});

const Counselor = mongoose.model("Counselor", counselorSchema);
export default Counselor; 