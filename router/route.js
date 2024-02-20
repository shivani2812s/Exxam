const express = require('express');
const mongoose=require('mongoose')
const router = express.Router();
const loginController=require('../controllers/loginController');
const studentController=require('../controllers/studentController');
const teacherController=require('../controllers/teacherController');
const passwordController=require('../controllers/passwordController');
router.get('/login', loginController.viewlogin);

router.get('/signup/student',studentController.viewstudentSignup);
router.post('/signup/student',studentController.studentSignup);

router.get('/signup/teacher',teacherController.viewSignup);
router.post('/signup/teacher',teacherController.teacherSignup);

router.get('/forgetpassword',passwordController.forget);
router.post('/forgetpassword',passwordController.forgetPassword);

router.get('/resetpassword',passwordController.reset);
router.post('/resetpassword',passwordController.resetPassword);
module.exports = router;
