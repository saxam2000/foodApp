
const express = require("express");

const app = express();

app.use(express.static("public"));
app.use(express.json());

const usermodel=require("./models/userModel");


function createUser(req, res) {
  console.log("req.data", req.body);
//   let user = req.body;
  res.status(200).send("data recieved and user added ");
}
async function getUser(req, res) {
    let users=await usermodel.find();
  console.log("users--> ",users);
  res.json(users);

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

  let user=await usermodel.create(userObj);
  console.log("userl-> " ,user);

  // console.log(req.body);
  res.status(200).json({message:"user created",createdUser:userObj});
  console.log("users",user);
}
function loginUser(req, res) {}
function userCreatedAt(req,res,next){
    let body=req.body;
    let length=Object.keys(body).length;
    if(length==0){
        return res.status(400).json({
            message:"cant create empty user"
        })
    }
    req.body.createdAt=new Date().toISOString();
    next();
}


const UserRouter = express.Router();
const AuthRouter = express.Router();

app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);

UserRouter.route("/")
  .get(getUser)
  .post(createUser)
  .patch(updateUser)
  .delete(deletUser);
UserRouter.route("/:id").get(getUserById);
AuthRouter

  .post("/signup",userCreatedAt,signupUser)//userCreatedAt is a middleware
  .post("/login", loginUser)
  .get("/signup",displayUser);


app.listen(3000, function () {
  console.log("server started");
});

