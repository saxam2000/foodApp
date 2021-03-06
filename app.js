// npm init -y
// npm i express
// npm i nodemon -g 
const express = require("express");
const mongoose = require("mongoose");
// var mongoose = require('./mongoconnection');
// Server: // route  -> request -> response/file 
// File system// path -> interact/type -> file /folder
// server init
const app = express();
const cookieParser = require("cookie-parser");
// post accept -> folder designate  
app.use(express.static('public'))
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./Routers/authRouter");
const userRouter = require("./Routers/userRouter");
const planRouter = require("./Routers/planRouter");
const reviewRouter = require("./Routers/reviewRouter");
const bookingRouter=require("./Routers/bookingRouter")
// /api/user/:id
app.use("/api/plan", planRouter);
app.use('/api/user', userRouter);
// auth router -> verb 
app.use("/api/auth", authRouter);
app.use("/api/review", reviewRouter);
app.use("/api/booking", bookingRouter);

app.listen(process.env.PORT||3000, function () {
    console.log("server started at http://localhost:3000");
})
