const express = require("express");
const cookieParser=require("cookie-parser");

const app = express();
app.use(cookieParser());

app.use(express.static("public"));
app.use(express.json());

const usermodel = require("./models/userModel");


const UserRouter = require("./Routes/userRoute");
const AuthRouter = require("./Routes/authRoute");

app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);


app.listen(3000, function () {
  console.log("server started");
});
