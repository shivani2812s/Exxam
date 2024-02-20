const Student=require('../models/studentModel');
const Teacher=require('../models/teacherModel');
const viewlogin=(req,res)=>{
    res.render('login');
}
const userlogin= async (req, res) => {
    try {
        const { email,password } = req.body;
        const student=await Student.findOne({email,password});
        const teacher=await Teacher.findOne({email,password})
        if(student){
            // req.session.student=student;
            res.json({message:'user loged In sucessfully'});
        }
        else if(teacher){
            // req.session.student=student;
            res.json({message:'user loged In sucessfully'});
        }
        else{
            res.status(500).json({message:'user not registered'});
        }
    } catch (error){
        console.log(error);
        res.status(500).json({message:'error logging user'});
    }
}
module.exports={viewlogin,userlogin};