const express = require("express");
const AuthRouter = express.Router();
const usermodel = require("../models/userModel");
const { JWT_SECRET_KEY } = require("../secrets");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
let emailSender=require("../externalServices/emailSender");

function displayUser(req, res) {
  console.log(req.body);
  res.status(200).json({ signupPage: req.body });
}
async function signupUser(req, res) {
  console.log("hello signup page");
  let userObj = req.body;
  try {
    let user = await usermodel.create(userObj);
    console.log("userl-> ", user);
    res.status(200).json({ message: "user created", createdUser: userObj });
    console.log("users", user);
  } catch (err) {
    console.log(err);
    res.status(400).json({message:err})
  }

  // console.log(req.body);
}
async function loginUser(req, res) {
  let body = req.body;
  if (body) {
    let user = await usermodel.findOne({ email: body.email });
    if (user) {
      if (body.Password == user.Password) {
        let payload = user["_id"];
        let jwtToken = jwt.sign({ id: payload }, JWT_SECRET_KEY);
        res.cookie("test", jwtToken, { HttpOnly: true });
        return res.status(200).json({
          user: user,
          message: "user logged in",
        });
      } else {
        return res.status(401).json({ message: "email or pasword is wrong" });
      }
    } else {
      return res.status(401).json({ message: "email or pasword is wrong" });
    }
  } else {
    res.status(403).json({
      message: "Email not present",
    });
  }
}
function userCreatedAt(req, res, next) {
  let body = req.body;
  let length = Object.keys(body).length;
  if (length == 0) {
    return res.status(400).json({
      message: "cant create empty user",
    });
  }
  req.body.createdAt = new Date().toISOString();
  next();
}
async function forgetPassword(req,res){
  let requestBody=req.body;
  let email=requestBody.email;
  let user=await usermodel.findOne({email:requestBody.email});
  if(user){
    try{

      const otp = Math.floor(1000 + Math.random() * 9000);
      await usermodel.updateOne({email},{token:otp})
      await emailSender(otp);
      console.log(otp);
    }
    catch(err){
      console.log(err);
    }

  }else{
    return res.status(404).json({message: "invalid email"});
    //invalid email
  }
  console.log(user);
  return res.status(200).json({message:"done.."});

}
async function resetPassword(req,res){
  let requestBody=req.body;
  let {email,Password,confirmPassword,token}=requestBody;
  let user=await usermodel.findOne({email:email});
  console.log(user);
  if(user){
    console.log("tokenfromReq : ",token,"  tokenfromUser : ",user.token);
    if(user.token===token){
      user.resetHandler(Password,confirmPassword);
      await user.save();
    }else{
      //invalid otp entered
      return res.status(404).json({message:"invalid otp"})
    }
    
  }else{
    return res.status(404).json({message:"user invalid"})
    //user not found
  }
  return res.status(200).json({message:"Password reset done...  "});

}

AuthRouter
.post("/signup", userCreatedAt, signupUser) //userCreatedAt is a middleware
  .post("/login", loginUser)
  .get("/signup", displayUser)
  .post("/forgetPassword",forgetPassword)
  .post("/resetPassword",resetPassword);
module.exports = AuthRouter;
