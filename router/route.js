const express = require('express');
const mongoose=require('mongoose')
const router = express.Router();
const loginController=require('../controllers/loginController');
const studentController=require('../controllers/studentController');
const teacherController=require('../controllers/teacherController');
const passwordController=require('../controllers/passwordController');
const dashboardController=require('../controllers/dashboardController');
const {Student}=require('../models/studentModel');
const {Exam}=require('../models/questions');

router.get('/',(req,res)=>{
    res.render('login')
})
router.get('/',async(req,res)=>{
    const exam = await Exam.find();
    res.render('UI',{exam});
})
router.get('/login', loginController.viewlogin);
router.post('/login',loginController.userlogin);

router.get('/signup',(req,res)=>{
    res.render('signup');
});

router.post('/signup/student',studentController.studentSignup);

router.post('/signup/teacher',teacherController.teacherSignup);

router.get('/forgetpassword',passwordController.forget);
router.post('/forgetpassword',passwordController.forgetPassword);

router.get('/resetpassword',passwordController.reset);
router.post('/resetpassword',passwordController.resetPassword);



router.get('/student/question',(req,res)=>{
        res.render('questions');
})


module.exports = router;
