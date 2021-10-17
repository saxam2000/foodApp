const mongoose=require("mongoose");
let {DB_LINK}=require("../secrets");
mongoose.connect(DB_LINK, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
}).then(function () {

    console.log("connected to review db")
}).catch(function (err) {
    console.log("err", err);
})


const reviewSchema=new mongoose.Schema({
    review:{
        type:String,
        required:[true,"empty review error"]
    },
    rating:{
        type:Number,
         min:1,max:5,
         required:[true,"Review must contain some rating"]
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    user:{
        type:[mongoose.Schema.ObjectId],
        ref:"userModel",
        required:[true,"Review must belong to a user"]
    },
    plan:{
        type:[mongoose.Schema.ObjectId],
        ref:"planModel",
        required:[true,"Review must belong to a plan"]
    }


})
const reviewModel=mongoose.model("reviewModel",reviewSchema);
module.exports=reviewModel;