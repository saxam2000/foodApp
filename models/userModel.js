const mongoose=require("mongoose");
let {DB_LINK}=process.env||require("../secrets");
let emailValidator=require("email-validator")
// var uniqueValidator = require('mongoose-unique-validator')
mongoose.connect(DB_LINK).then(function(db){
    // console.log(db);
    console.log("connected to db");
}).catch(function(err){
    console.log("error--> ",err);
})

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required : true,
    },
    
    email:{
        type:String,
        required: true, unique: true,
        // validate:function(){
        //     return emailValidator.validate(this.email);
        // },
    },
    age:{
        type:Number,
    },
    Password:{
        type:String,
        minLength:7,
        required:true,
    },
    confirmPassword:{
        type:String,
        validate:function(){
            return this.Password==this.confirmPassword;
        }

    },
    createdAt:{
        type:String,
    },
    token:String,
    role:{
        type:String,
        enum:["user","admin","manager"],
        default:"user",
    }
})
userSchema.methods.resetHandler=function(Password,confirmPassword){
    this.Password=Password;
    this.confirmPassword=confirmPassword;
    this.token=undefined;
    // user.save();
    
}
// userSchema.plugin(uniqueValidator)
userSchema.pre("save",function(){
    this.confirmPassword=undefined;
})
const userModel=mongoose.model("userModel",userSchema);
//  userModel=mongoose.model("userModel",userSchema);
module.exports=userModel;
