const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Teachers=require('../models/teacherModel');
const Exam=require('../models/questions');
const authenticateToken=require('../middleware/authMiddleware');

router.get('/allteachers',async(req,res)=>{
const teachers=await Teachers.find();
res.render('allteachers',{teachers})
});

router.get('/teacherdashboard',async(req,res)=>{
    res.render('teacherdashboard');
})

router.get('/allexams',async(req,res)=>{
    try {
        const user = req.user;
        console.log(user);
        const userId = user.userId;
        const exams = await Exam.find({ teacherId: userId });
        res.render('resultList',{exams});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;