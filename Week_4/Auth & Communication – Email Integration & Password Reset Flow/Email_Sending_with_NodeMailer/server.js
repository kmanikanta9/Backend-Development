let express = require ('express');
let app = express ();
app.use (express.json ());

require ('dotenv').config ();

const nodemailer = require ('nodemailer');

app.get ('/test', (req, res) => {
  res.status (200).json ({message: 'Test Route is Working'});
});
// mailing
const transporter = nodemailer.createTransport ({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.google_app_email,
    pass: process.env.google_app_password,
  },
});
app.get ('/sendemail', async (req, res) => {
  await transporter.sendMail ({
    from: '"Aswartha" <212g1a0403@gmail.com>',
    to: 'aswarth03@gmail.com, venugopal.burli@masaischool.com',
    subject: 'This is a Simple test mail..',
    text: 'This is a testing Mail sent by NEM student, no need to reply.', 
    // html: '<b>Hello world?</b>', // HTML body
  });
  res.status(200).json({message:"Email Sent"})
});


app.use ((req, res) => {
  res.status (404).json ({message: '404 , Route is Not Found'});
});

app.listen (3000, () => {
  console.log ('Server is Running on 3000 port');
});
