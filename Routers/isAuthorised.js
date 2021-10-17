let usermodel=require("../models/userModel");
function isAuthorised(rolesArray){
    return async function(req,res,next){
        let uid=req.uid;
        let {role,email}=await usermodel.findById(uid);
        if(rolesArray.includes(role)){
            next();
        }else{
            res.status(403).json({message:"user not Authorised"});
        }
        
    } 
} 
module.exports = isAuthorised;