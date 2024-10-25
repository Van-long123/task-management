const nodemailer = require("nodemailer");
require('dotenv').config();
module.exports.sendMail=(email,subject,html)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            //đay ko phải là tài khoản email của ta đâu
            //đây là tải khoản xác nhận 2 lớp
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASSWORD, 
        }
      });
      
      var mailOptions = {
        from: process.env.EMAIL_USER, 
        to: email,
        subject: subject,
        // text: ''
        html:html
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}