const nodemailer = require('nodemailer');
const {details}=require('./contact.services');

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
const ContactMessage = (req, res) => {
  const { email,name,subject } = req.body;

  const mailOptions = {
    from: 'homefeast.food@gmail.com',
    to: email,
    subject: 'Customer Feedback',
    html: 'Hi '+name+', <br>Thank you for opinion about the subject "'+subject+'".We will look into it',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error); // Log the specific error
      return res.status(500).send({ message: error });
    }

    res.status(200).send({ message: 'Verification email sent.' });
  });


const body=req.body;

    details(body,(errromessge,results)=>{ 
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


module.exports = { ContactMessage };
