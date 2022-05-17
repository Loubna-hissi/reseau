const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");
const Token = require("../models/token");
require('dotenv').config();
const crypto = require("crypto");

const signIn = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err || !user) {
        return res.json({ error: "Aucune donnée trouvée" });
      }
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (!isMatch) {
          return res.json({ error: "Email ou mot de passe est incorrect" });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie("t", token, {
          expire: new Date() + 9999,
        });
        // if (!user.verified) {
        //   // let tokenToCheck =  Token.findOne({ userId: user._id });
        //   // const url = `${process.env.BASE_URL}user/${user.id}/verify/${tokenToCheck.token}`;
        //   //  sendEmail(user.email, "Verify Email", url);

        //   return res.json({ error: "check checkt" });

        // }
        user.hashed_password = undefined;
        user.salt = undefined;
        return res.json({
          token,
          user,
        });
      });
    });
  };
  

const logOut = (req, res) => {
    res.clearCookie("t");
    res.json({ message: "Log out!" });
}


const requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth",
    algorithms: ["HS256"]
})


const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!authorized) {
        return res.json({
            error: "Not allowed authorization!"
        })
    }
    next()
}

module.exports = {
    signIn,
    logOut,
    hasAuthorization,
    requireSignIn
}