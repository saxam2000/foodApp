const express = require("express");
const AuthRouter = express.Router();
const usermodel = require("../models/userModel");
const {JWT_SECRET_KEY}=require("../secrets");
var Cookies = require('cookies');
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");


let flag=true;
function displayUser(req, res) {
    console.log(req.body);
    res.status(200).json({ signupPage: req.body });
  }
  async function signupUser(req, res) {
    console.log("hello signup page");
    let userObj = req.body;
  
    let user = await usermodel.create(userObj);
    console.log("userl-> ", user);
  
    // console.log(req.body);
    res.status(200).json({ message: "user created", createdUser: userObj });
    console.log("users", user);
  }
  async function loginUser(req, res) {
      let body=req.body;
      if(body){
          let user=await usermodel.findOne({email:body.email});
          if(user){
              if(body.Password==user.Password){
                let payload=user["_id"];
                let jwtToken=jwt.sign({ id:payload }, JWT_SECRET_KEY);
                res.cookie("test",jwtToken,{HttpOnly:true})
                  return res.status(200).json({
                      user: user,
                      message:"user logged in",
                  })

              }else{
                  return res.status(401).json({message:"email or pasword is wrong"});

              }

          }else{
            return res.status(401).json({message:"email or pasword is wrong"})
          }

      }else{
          res.status(403).json({
              message:"Email not present",
          })
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

AuthRouter
.post("/signup", userCreatedAt,signupUser) //userCreatedAt is a middleware
  .post("/login", loginUser)
  .get("/signup", displayUser);
module.exports=AuthRouter;