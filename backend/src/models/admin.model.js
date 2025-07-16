import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
    teachID: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["admin", "student"],
        default: "admin",
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    }],
    isActive: { type: Boolean, default: true },
},{timestamps: true});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;