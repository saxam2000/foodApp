const express = require("express");
const usermodel = require("../models/userModel");
const {JWT_SECRET_KEY}=require("../secrets");
// const app = express();
const UserRouter = express.Router();
const jwt=require("jsonwebtoken");

// app.use("/api/user", UserRouter);
UserRouter
.route("/")
.post(createUser)
.get(protectRoute,getUser);

UserRouter
.route("/:id")
.get(getUserById)
.patch(updateUser)
.delete(deletUser);

 let flag=true;;


function protectRoute(req,res,next){
  if(!req.cookies){
    return res.status(401).json({
      message:"Unauthorized access",
    })
  }
  if(jwt.verify(req.cookies.test,JWT_SECRET_KEY)){
    next();
  }else{
    return res.status(401).json({
      message:"Unauthorized access",
    })
  }
}

 
function createUser(req, res) {
    console.log("req.data", req.body);
    //   let user = req.body;
    res.status(200).send("data recieved and user added ");
  }
  async function getUser(req, res) {
    let users = await usermodel.find();
    if(users){
      res.status(200).json({
        message:"list of all users",
        users:users
      })
      console.log("users--> ", users);
    }else{
      res.status(500).json({
        message:"Cant get users"
      })
    }
    
    
  }
  function updateUser(req, res) {
    let obj = req.body;
    for (let key in obj) {
      user[key] = obj[key];
    }
    res.status(200).json(user);
  }
  function deletUser(req, res) {
    user = [];
    res.status(200).json(user);
  }
  function getUserById(req, res) {
    console.log(req.params);
    res.status(200).send("Hello");
  }
  module.exports=UserRouter;