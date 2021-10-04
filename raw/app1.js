// npm init -y
// npm i express
// npm i nodemon -g
const express = require("express");
// Server: // route  -> request -> response/file
// File system// path -> interact/type -> file /folder
// server init
const app = express();
// post accept
app.use(express.static("public"));
app.use(express.json());
//send static files to server through express
// function -> route  path
// frontend -> req -> /
const usermodel=require("./models/userModel");

// let user = [];
// getting data from server
// giving data to server
// crud app
// create
// .form fill
function createUser(req, res) {
  console.log("req.data", req.body);
  user = req.body;
  res.status(200).send("data recieved and user added ");
}
function getUser(req, res) {
  console.log("users");
  res.json(user);
  // for sending key value pair
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

function displayUser(req,res){
  console.log(req.body);
  res.status(200).json({"signupPage":req.body});
}
async function signupUser(req, res) {
  console.log("hello signup page");
  let userObj=req.body;
  // user.push(userObj);
  let user=await usermodel.create(userObj);
  console.log("userl-> " ,user);

  // console.log(req.body);
  res.status(200).json({message:"user created",createdUser:userObj});
  console.log("users",user);
}
function loginUser(req, res) {}

// mounting in express
const UserRouter = express.Router();
const AuthRouter = express.Router();
// /api/user/:id
app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);

UserRouter.route("/")
  .get(getUser)
  .post(createUser)
  .patch(updateUser)
  .delete(deletUser);
UserRouter.route("/:id").get(getUserById);
AuthRouter
  // .route("/user")
  .post("/signup", signupUser)
  .post("/login", loginUser)
  .get("/signup",displayUser);

// app.post("/api/user", getUser);
// // get
// app.get("/api/user", createUser);
// //update
// app.patch("/api/user", updateUser);
// //delete
// app.delete("/api/user", deletUser);
//template routes
// app.get("api/user/:id", getUserById);

//localhost:8080 ??
app.listen(3000, function () {
  console.log("server started");
});
// / port, ip,localhost
