const nodemailer = require("nodemailer");
const {APP_PASSWORD}=require("../secrets");
// const config=require("config");

// async..await is not allowed in global scope, must use a wrapper
module.exports = async function main(otp) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:"gmail"  ,
    host: "smtp.gmail.com",
    // port: 587,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "saxamdhyani5july@gmail.com", // generated ethereal user
      pass: APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  try{

  
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "saxamdhyani1999@gmail.com, princevr0@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<b>Hello world?  ${otp}</b>`, // html body
  });
  } 
  catch(err){
    console.log(err);
  }

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

