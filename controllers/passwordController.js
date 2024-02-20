const nodemailer = require('nodemailer');
const crypto = require('crypto');
const ResetToken = require('../models/resetToken');
const Student=require('../models/studentModel');
const Teacher=require('../models/teacherModel');

const generateToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

const forgetPassword = async (req, res) => {
  const userEmail = req.body.email;

  const resetToken = generateToken();

  const resetTokenDoc = new ResetToken({
    email: userEmail,
    token: resetToken,
  });

  try {
    await resetTokenDoc.save();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to save reset token' });
  }

  const resetLink = `http://localhost:3001/resetpassword?token=${resetToken}`;
  console.log(resetLink);
  nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'dillon97@ethereal.email',
        pass: 'y1wpwKUja3gacT8yU6'
    }
});
  
const mailOptions = {
  from: '"Shivani" <shivanisingh36813@gmail.com>',
  to: userEmail,
  subject: 'Reset Password',
  text: `Click the following link to reset your password: ${resetLink}`,
  html: `<p>Click the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
};

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to send reset email' });
    }
    console.log('Reset email sent: ' + info.response);
    res.json({ message: 'Reset email sent successfully' });
  });
};

const forget = (req, res) => {
  res.render('forget');
};

const reset = (req, res) => {
  res.render('reset');
};

const resetPassword = async (req, res) => {
  
  const {newPassword, confirmPassword, token } = req.body;

  const resetToken = await ResetToken.findOne({ token });
  if (!resetToken) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
  
  let user = await Student.findOne({ email: resetToken.email });
  if (!user) {
    user = await Teacher.findOne({ email: resetToken.email });
  }
  
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  user.password = newPassword;
  await user.save();
  await ResetToken.deleteOne({ token });
  res.json({ message: 'Password reset successfully' });
};


module.exports = { forgetPassword, forget, reset,resetPassword };
