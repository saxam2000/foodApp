const jwt = require("jsonwebtoken");
const cookieParser=require("cookie-parser");
const express = require('express');
express().use(cookieParser());
const { JWT_KEY } = require("../secrets");
// ahead -> protect that route 
function protectRoute(req, res, next) {
    // console.log(req.cookies,"   aa gya")
    try {
        next();
        // if (req.cookies.jwt) {
        //     let decrytptedToken = jwt.verify(req.cookies.jwt, JWT_KEY);
        //     if (decrytptedToken) {
        //         req.uid = decrytptedToken.id;
        //     }
        // } else {
        //     res.status(401).json({
        //         message: "You are not allowed jwt token"
        //     })
        // }
    } catch (err) {
        res.status(500).json({
            message: "server error"
        })
    }
}
module.exports = protectRoute;