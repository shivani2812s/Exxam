const express = require('express');
const mongoose=require('mongoose')
const router = express.Router();

router.get('/adminpanel',(req,res)=>{
    res.render('adminpanel')
})
module.exports = router;
