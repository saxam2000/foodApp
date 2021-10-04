const mongoose=require("mongoose");
let {DB_Link}=require("../secrets");
let emailValidator=require("email-validator")
mongoose.connect(DB_Link).then(function(db){
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
        required:true,
        validate:function(){
            return emailValidator.validate(this.email);
        },
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
    }
})
userSchema.pre("save",function(){
    this.confirmPassword=undefined;
})
const userModel=mongoose.model("userModel",userSchema);
//  userModel=mongoose.model("userModel",userSchema);
module.exports=userModel;
