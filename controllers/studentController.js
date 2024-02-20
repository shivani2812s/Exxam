const Student=require('../models/studentModel');

const studentSignup = async (req, res) => {
    try {
        const { firstname, lastname, email,gender, phno, enrollmentno, classname,dob,password} = req.body;
        const newStudent = new Student({
            firstname,
            lastname,
            email,
            gender,
            phno,
            enrollmentno,
            classname,
            dob,
            password,
        });
        await newStudent.save();
        res.status(201).json({ message: 'Student created successfully' });
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const viewstudentSignup=(re,res)=>{
    res.render('studentSignup');
}
module.exports={studentSignup,viewstudentSignup};