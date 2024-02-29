const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Student=require('../models/studentModel');
router.get('/allstudents',async(req,res)=>{
    const students=await Student.find();
    res.render('allstudents',{students});
})

module.exports = router;