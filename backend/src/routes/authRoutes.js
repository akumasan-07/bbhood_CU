import express from "express";
import { studentLogin, studentSignup, teachLogin, teachSignup, counselorSignup, counselorLogin } from "../controllers/auth.controller.js";

const router  = express.Router();

router.post('/teacher-signup',teachSignup);
router.post('/teacher-login',teachLogin);
router.post('/student-signup',studentSignup);
router.post('/student-login',studentLogin);
router.post('/counselor-signup', counselorSignup);
router.post('/counselor-login', counselorLogin);


export default router;