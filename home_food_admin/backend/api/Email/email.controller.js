const nodemailer = require('nodemailer');
const {forgotpwd,updatePasswordS}=require('./email.services');

// In-memory storage (use a database in production)
let users = {};

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  secureConnection: false,
  auth: {
    user: 'homefeast.food@gmail.com',
    pass: 'hublzhxbiefjnjsf',
  },
});

// Controller functions
const registerUser = (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(Math.random() * (10000 - 1000)) + 1000; // 4-digit OTP

  users[email] = { email, otp, verified: false };

  const mailOptions = {
    from: 'homefeast.food@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Welcome to Home Feast!
  
  Please enter this OTP to verify your email address: ${otp}
  This OTP is valid for the next 3 minutes. 
  
  If you didn't request this verification, please ignore this email.
  
  Thank you for joining us, and happy cooking!
  
  Best regards, 
  The Home Feast Team`,
  };
  

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error); // Log the specific error
      return res.status(500).send({ message: error });
    }

    // Set a timeout to clear the OTP after 3 minutes
    setTimeout(() => {
      if (users[email] && !users[email].verified) {
        delete users[email].otp;
        console.log(`OTP for ${email} has been cleared after 3 minutes.`);
      }
    }, 3 * 60 * 1000); // 3 minutes in milliseconds

    res.status(200).send({ message: 'Verification email sent.' });
  });
};

const verifyUser = (req, res) => {
  const { email, otp } = req.body;

  if (users[email] && users[email].otp === parseInt(otp)) {
    users[email].verified = true;
    delete users[email].otp;
    res.status(200).send('Email verified successfully!');
  } else {
    res.status(400).send('Invalid or expired OTP.');
  }
};
const forgotPassword=(req,res)=>{
  const body=req.params.email;
  forgotpwd(body,(errromessge,results)=>{ 
      if(errromessge){
          return res.status(500).json({
              success:0,
              status:500,
              err:errromessge
          });
      }else if(results){
          return res.status(200).json({
              success:1,
              status:200,
              message:results

          })
      }

  });
};

const  updatePassword=(req,res) =>{
  const body = req.body;    
  updatePasswordS(body, (err, results) => {
      if(err){
          return res.status(500).json( {
              success:0,
              status:500,
              error:err
          }); 
      }
      else{
          return res.status(200).json({
              success:1,
              data:results,
              status:200
          });
      }            
  });
};


module.exports = { registerUser, verifyUser,forgotPassword,updatePassword };
