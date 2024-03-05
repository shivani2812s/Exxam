const express = require('express');
const mongoose=require('mongoose')
const router = express.Router();
const loginController=require('../controllers/loginController');
const { userSignUp } = require('../controllers/signUpController');
const studentController=require('../controllers/studentController');
const teacherController=require('../controllers/teacherController');
const passwordController=require('../controllers/passwordController');
const dashboardController=require('../controllers/dashboardController');


router.post('/questiondata',(req,res)=>{
    console.log(req.body);
})
router.get('/', loginController.viewlogin);

router.post('/login',loginController.userlogin);

router.get('/signup',(req,res)=>{
    res.render('signup');
});

router.post('/signup', userSignUp);



router.get('/forgetpassword',passwordController.forget);
router.post('/forgetpassword',passwordController.forgetPassword);

router.get('/resetpassword',passwordController.reset);
router.post('/resetpassword',passwordController.resetPassword);



router.get('/student/question',(req,res)=>{
        res.render('questions');
})
module.exports = router;
