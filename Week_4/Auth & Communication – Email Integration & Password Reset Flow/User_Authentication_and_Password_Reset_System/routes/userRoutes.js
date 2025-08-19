let express = require ('express');
let userRouter = express.Router ();

const bcrypt = require ('bcrypt');
const UserModel = require ('../models/userModel');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

var jwt = require ('jsonwebtoken');
const nodemailer = require ('nodemailer');
// signup
userRouter.post ('/signup', async (req, res) => {
  try {
    let {email, password, name} = req.body;
    let user = await UserModel.findOne ({email: email});
    if (user) {
      return res
        .status (200)
        .json ({message: 'user already signup , please login'});
    }
    bcrypt.hash (password, saltRounds, async function (err, hash) {
      if (hash) {
        let newUser = await UserModel.create ({email, name, password: hash});
        res.status (201).json ({message: 'signup success', newUser});
      } else {
        res.status (400).json ({message: 'something went Wrong'});
      }
    });
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
});

// login
userRouter.post ('/login', async (req, res) => {
  try {
    let {email, password} = req.body;
    let user = await UserModel.findOne ({email});
    console.log (user);
    if (!user) {
      return res
        .status (400)
        .json ({message: 'User Not Found , Please signup'});
    }
    const hash = user.password;
    bcrypt.compare (password, hash, function (err, result) {
      if (!result) {
        return res.status (402).json ({message: 'Wrong Password..'});
      }
      var token = jwt.sign ({userId: user._id}, process.env.Jwt_security_key, {
        expiresIn: 20,
      });
      res.status (200).json ({message: 'login success', token});
    });
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
});

const transporter = nodemailer.createTransport ({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.google_app_user,
    pass: process.env.google_app_password,
  },
});

// forgot password
userRouter.post ('/forgot-password', async (req, res) => {
  try {
    let {email} = req.body;
    let user = await UserModel.findOne ({email});
    if (!user) {
      return res.status (403).json ({message: 'User is not found'});
    }
    // console.log (user);
    let resetToken = jwt.sign (
      {userId: user._id},
      process.env.Jwt_security_key,
      {
        expiresIn: 20 * 60,
      }
    );
    let resetPasswordLink = `http://localhost:3000/user/reset-password?token=${resetToken}`;
    // sending email
    // await transporter.sendMail ({
    //   from: '"Aswartha" <aswarth03@gmail.com>',
    //   to: user.email,
    //   subject: 'Reset Password',
    //   text: `Please Reset Your Password, Link : ${resetPasswordLink}`,
    // });
    res.status (200).json ({
      message: 'Reset password link is sent to regestered email',
      resetPasswordLink,
    });
  } catch (error) {
    // console.log (error.message);
    res.status (500).json ({message: error.message});
  }
});

// reset password
userRouter.post ('/reset-password', async (req, res) => {
  try {
    let {token} = req.query;
    let {newPassword} = req.body;
    if (!token || !newPassword) {
      return res
        .status (400)
        .json ({message: 'token and newPasswerd are required'});
    }
    // token and password here
    // checking token valid
    var decoded = jwt.verify (token, process.env.Jwt_security_key);
    if (decoded) {
      let userId = decoded.userId 
      let user = await UserModel.findById(userId)
      bcrypt.hash (newPassword, saltRounds, async function (err, hash) {
      if (hash) {
        user.password = hash 
        await user.save()
         res.status (200).json ({message: 'Reset password Completed',user});
      } else {
        res.status (400).json ({message: 'something went Wrong'});
      }
    });
    } else {
      res.status (200).json ({message: 'Invalid token'});
    }
  } catch (error) {
    if(error.message=='jwt expired'){
      return res.status(400).json({message:"Token Expired , please login again"})
    }
    res.status (500).json ({message: error.message});
  }
});
module.exports = userRouter;
