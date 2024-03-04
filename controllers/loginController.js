const jwt = require('jsonwebtoken'); 

const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const viewlogin = (req, res) => {
    res.render('login');
};

const userlogin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: user.email, userType: user.userType }, 'xyz');

        return res.status(200).json({
            message: 'Login successful',
            token: token,
            email: user.email,
            userType: user.userType
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { viewlogin, userlogin };
