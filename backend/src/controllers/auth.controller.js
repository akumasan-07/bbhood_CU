import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js";
import Student from "../models/student.model.js";

export const teachSignup = async (req, res) => {
    const {username,phone,password,email,teachID} = req.body;
    try {
        if(!username || !phone || !password || !email || !teachID){
            return res.status(400).json({success:false,message:"All fields are required"});
        }
        if(phone.length!=10){
            return res.status(400).json({success:false,message:"mobile number should be 10 character long"});
        }
        if(password.length<6){
            return res.status(400).json({success:false,message:"password must be 6 character long"});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        const existing = await Admin.findOne({ $or: [{ email }, { phone }] });
        if (existing) {
            return res.status(400).json({ success: false, message: "Email or phone already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password,salt);

        const teacher = new Admin({
            username,
            phone,
            password:hashpassword,
            email,
            teachID,
        });

        await teacher.save();

        return res.status(201).json({ success: true, message: "Teacher registered successfully",teacher});


    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

export const teachLogin = async (req,res)=>{
    const {teachID,password} = req.body;
    try {
        if(!password ||!teachID){
            return res.status(400).json({success:false,message:"All fields are required"});
        }
        const teacher = await Admin.findOne({teachID});
        if(!teacher){
            return res.status(404).json({success:false,message:"teacher not found"});
        }
        const isMatch = await bcrypt.compare(password,teacher.password);
        if(!isMatch){
            return res.status(401).json({ success: false, message: "Invalid password" });
        }
        return res.status(200).json({ success: true, message: "Login successful", teacher });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

export const studentSignup = async (req,res)=>{
    const {username,studentID,phone,password,email,teacherID} = req.body;
    try {
        if(!username || !phone || !password || !email || !teacherID || !studentID){
            return res.status(400).json({success:false,message:"All fields are required"});
        }
        if(phone.length!=10){
            return res.status(400).json({success:false,message:"mobile number should be 10 character long"});
        }
        if(password.length<6){
            return res.status(400).json({success:false,message:"password must be 6 character long"});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        const existing = await Student.findOne({$or: [{ email }, { phone }] });
        if(existing){
            return res.status(400).json({success:false,message:"student already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password,salt);

        const teacher = await Admin.findOne({teachID:teacherID});
        if (!teacher) {
            return res.status(404).json({ success: false, message: "Teacher not found" });
        }

        const student = await Student.create({
            username,
            phone,
            email,
            studentID,
            password:hashpassword,
            teacherID:teacher._id
        })
        await Admin.findByIdAndUpdate(
            teacher._id,
            { $push: { students: student._id } }
        );
        await student.save();
        return res.status(201).json({ success: true, message: "Student registered successfully",student});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}
export const studentLogin = async (req,res)=>{
    const {studentID,password} = req.body;
    try {
        if(!password ||!studentID){
            return res.status(400).json({success:false,message:"All fields are required"});
        }
        const student = await Student.findOne({studentID});
        if(!student){
            return res.status(404).json({success:false,message:"student not found"});
        }
        const isMatch = await bcrypt.compare(password,student.password);
        if(!isMatch){
            return res.status(401).json({ success: false, message: "Invalid password" });
        }
        return res.status(200).json({ success: true, message: "Login successful", student });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error!" });
    }
}