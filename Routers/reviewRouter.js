let factory=require('../helpers/factory');
let express=require("express");
let reviewRouter=express.Router();

let reviewModel=require("../models/reviewModel");
let getReviews=factory.getElements(reviewModel);
reviewRouter.route("/")
.post(getReviews)


module.exports =reviewRouter;