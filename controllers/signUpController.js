const User = require("../models/userModel");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userSignUp = async (req, res) => {
    const email = req.body.email;
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const user = new User(req.body);
        const password = await bcrypt.hash(req.body.password, 10);
        user.password = password;
        await user.save();
        const token = jwt.sign({ userId:user._id,userType:user.userType,email: user.email }, 'xyz');

        return res.status(200).json(
            {
                message: 'User Registered successfully',
                token: token,
                email: user.email,
                userType: user.userType
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { userSignUp };