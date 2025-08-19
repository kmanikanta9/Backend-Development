let express = require ('express');
const UserModel = require ('../models/userModel');
let userRouter = express.Router ();

const bcrypt = require ('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

var jwt = require ('jsonwebtoken');
const orderMiddleware = require ('../middlewares/orderMiddleware');
const OrderModel = require ('../models/orderModel');
require ('dotenv').config ();
// sign up user
userRouter.post ('/signup', async (req, res) => {
  try {
    let {email, name, password, role} = req.body;
    let user = await UserModel.findOne ({email});
    if (user) {
      // user already signedup
      return res
        .status (200)
        .json ({message: 'User already signup, please login'});
    }
    bcrypt.hash (password, saltRounds, async function (err, hash) {
      if (err) {
        return res
          .status (400)
          .json ({message: 'Something went wrong ', Error: err});
      } else {
        let newUser = await UserModel.create ({
          email,
          name,
          role,
          password: hash,
        });
        res.status (201).json ({message: 'User Signup success', newUser});
      }
    });
  } catch (error) {
    console.log (error.message);
    res.status (500).json ({message: error.message});
  }
});

// login user
userRouter.post ('/login', async (req, res) => {
  try {
    let {email, password} = req.body;
    if (!email || !password) {
      return res
        .status (402)
        .json ({message: 'Please provide emailand password to login'});
    }
    // check whether user is signup or not
    let user = await UserModel.findOne ({email});
    if (!user) {
      return res.status (401).json ({message: 'Anuthorised, Please signup'});
    }
    // user found
    // need to verify password
    let hash = user.password;
    bcrypt.compare (password, hash).then (function (result) {
      if (result) {
        // password matches
        // need to generate token
        var token = jwt.sign (
          {userId: user._id, role: user.role},
          process.env.jwt_security_key,
          {expiresIn: 15 * 60}
        );
        res.status (201).json ({message: 'user login success', token});
      } else {
        // password not matches
        return res.status (401).json ({message: 'Password Wrong'});
      }
    });
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
});

// get all orders by user
userRouter.get ('/all-orders', orderMiddleware ('user'), async (req, res) => {
  try {
    let userId = req.user;
    let allUserOrders = await OrderModel.find ({user: userId})
      .populate ('dish', 'dishname price')
      .populate ('chef', 'name email');
    if (allUserOrders.length == 0) {
      return res.status (200).json ({message: 'No orders'});
    }
    res.status (200).json ({message: 'all user orders', allUserOrders});
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
});

// forgot password
userRouter.post ('/forgot-password', async (req, res) => {
  try {
    let {email} = req.body;
    let isUserExists = await UserModel.findOne ({email});
    console.log (isUserExists);
    if (!isUserExists) {
      // user not found
      return res.status (404).json ({message: 'User not found'});
    }
    // user found
    // need to generate token
    var token = jwt.sign (
      {userId: isUserExists._id},
      process.env.jwt_security_key,
      {expiresIn: 20 * 60}
    );
    let reset_link = `http://localhost:3000/user/reset-password?token=${token}`;
    res.status (200).json ({
      message: 'password Reset link is sent to regestered email , please updated your password within 20 minutes',
      link: reset_link,
    });
  } catch (error) {
    res.status (500).json ({message: error.message});
  }
});
userRouter.post ('/reset-password', async (req, res) => {
  try {
    let {newPassword} = req.body;
    let {token} = req.query;
    // validate the token
    // console.log ('token :', token);
    if (Object.entries (token).length == 0) {
      return res.status (400).json ({message: 'token not found'});
    }
    var decoded = jwt.verify (token, process.env.jwt_security_key);
    let user = await UserModel.findById (decoded.userId);
    // need to store hashed password
    bcrypt.hash (newPassword, saltRounds, async function (err, hash) {
      if (err) {
        return res
          .status (400)
          .json ({message: 'Something went wrong ', Error: err});
      } else {
        user.password = hash;
        await user.save ();
        res.status (200).json ({message: 'password updated'});
      }
    });
  } catch (error) {
    if (error.message == 'jwt expired') {
      return res
        .status (400)
        .json ({message: 'reset token expired , please try again'});
    }
    res.status (500).json ({message: error.message});
  }
});
module.exports = userRouter;
