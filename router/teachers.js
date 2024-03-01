const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Teachers=require('../models/teacherModel');



router.get('/allteachers',async(req,res)=>{
const teachers=await Teachers.find();
res.render('allteachers',{teachers})
});

router.get('/teacherdashboard',async(req,res)=>{
    res.render('UIteacher');
})
module.exports = router;