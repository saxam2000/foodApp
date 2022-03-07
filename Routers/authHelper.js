const jwt = require("jsonwebtoken");
const cookieParser=require("cookie-parser");
const express = require('express');
express().use(cookieParser());
const { JWT_KEY } = process.env||require("../secrets");
// ahead -> protect that route 
function protectRoute(req, res, next) {
    // console.log(req.cookies,"   aa gya")
    try {
        if (req.cookies.jwt) {
            let decrytptedToken = jwt.verify(req.cookies.jwt, JWT_KEY);
            if (decrytptedToken) {
                req.uid = decrytptedToken.id;
                next();
            }
        } else {
            res.status(401).json({
                message: "You are not allowed jwt token"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "server error"
        })
    }
}
module.exports = protectRoute;