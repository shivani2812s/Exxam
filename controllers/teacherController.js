const Teacher=require('../models/teacherModel');
const teacherSignup = async (req, res) => {
    try {
        const { firstname,lastname,gender,phno,employeeID,email,dob,password} = req.body;
        const newTeacher = new Teacher({
            firstname,
            lastname,
            password,
            gender,
            phno,
            employeeID,
            email,
            dob
        });
        await newTeacher.save();
        res.status(201).json({ message: 'teacher added successfully' });
    } catch (error) {
        console.error('Error adding teacher:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports={teacherSignup};