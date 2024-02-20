const mongoose=require('mongoose');
const teacherSchema=new mongoose.Schema({
    firstname:String,
    lastname:String,
    gender:String,
    phno:String,
    employeeID:String,
    email:String,
    dob:Date,
    password:String
})
module.exports=mongoose.model('teacher',teacherSchema);