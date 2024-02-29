const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Teachers=require('../models/teacherModel');



router.get('/allteachers',async(req,res)=>{
const teachers=await Teachers.find();
res.render('allteachers',{teachers})
});

module.exports = router;