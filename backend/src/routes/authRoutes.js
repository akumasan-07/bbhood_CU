import express from "express";
import { studentLogin, studentSignup, teachLogin, teachSignup, counselorSignup, counselorLogin, logout, getCurrentUser, getTeacherStudents, fixTeacherStudentLinks } from "../controllers/auth.controller.js";
import { markAttendance } from "../controllers/attendance.controller.js";
import authenticateJWT from '../middleware/authMiddleware.js';

const router  = express.Router();

router.post('/teacher-signup',teachSignup);
router.post('/teacher-login', teachLogin);
router.post('/student-signup',studentSignup);
router.post('/student-login',studentLogin);
router.post('/counselor-signup', counselorSignup);
router.post('/counselor-login', counselorLogin);
router.post('/logout', logout);
router.post('/attendance/mark', markAttendance);
router.get('/me', getCurrentUser);
router.get('/teacher/students', authenticateJWT, getTeacherStudents);
router.get('/fix-links', fixTeacherStudentLinks);

export default router;