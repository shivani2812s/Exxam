const express = require('express');
const mongoose=require('mongoose')
const router = express.Router();
const loginController=require('../controllers/loginController');
const studentController=require('../controllers/studentController');
const teacherController=require('../controllers/teacherController');
const passwordController=require('../controllers/passwordController');
const dashboardController=require('../controllers/dashboardController');

router.get('/',dashboardController.viewmaindashboard);

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
module.exports = router;
