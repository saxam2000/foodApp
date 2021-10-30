const mongoose = require("mongoose");
let DB_LINK;
if(process.env.DB_LINK){
   DB_LINK=process.env.DB_LINK
}else{
    DB_LINK  = require("../secrets").DB_LINK;
}

mongoose.connect(DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(function (db) {
    // console.log(db);
    console.log("connected to bookingmodel db")
}).catch(function (err) {
    console.log("err", err);
})
const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    plan: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    bookedAt: {
        type: Date
    },
    priceAtThatTime: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "failed", "success"],
        required: true,
        default: "pending"
    }
})
const bookingModel = mongoose.model("bookingModel", bookingSchema);
module.exports = bookingModel;