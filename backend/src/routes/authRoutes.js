import express from "express";
import { studentLogin, studentSignup, teachLogin, teachSignup } from "../controllers/auth.controller.js";

const router  = express.Router();

router.post('/teacher-signup',teachSignup);
router.post('/teacher-login',teachLogin);
router.post('/student-signup',studentSignup);
router.post('/student-login',studentLogin);


export default router;