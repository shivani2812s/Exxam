const mongoose=require('mongoose');
const studentSchema=new mongoose.Schema({
    firstname:String,
    lastname:String,
    password:String,
    gender:String,
    phno:String,
    enrollmentno:String,
    classname:String,
    email:String,
    dob:Date,
})
module.exports=mongoose.model('student',studentSchema);