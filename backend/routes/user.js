const express = require("express")
require('dotenv').config();
const crypto = require("crypto");
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");
const Token = require("../models/token");
const { getUserById, getUser, getAllUsers, updateUser, deleteUser, getUserPhoto, addFöllower, addFollowing, removeFöllowing, removeFöllower, createUser } = require("../controllers/user");
const { signIn, requireSignIn, hasAuthorization, logOut } = require("../controllers/auth");

const router = express.Router();


router.post("/api/users/create",createUser)

router.post("/api/auth/signin", signIn);

router.get("/api/auth/logout", logOut);

router.get("/api/user/:userId", getUser);

router.get("/api/users", requireSignIn, getAllUsers);

router.get("/api/user/photo/:userId", getUserPhoto);

router.put("/api/users/:userId", requireSignIn, hasAuthorization, updateUser);

router.delete("/api/users/:userId", requireSignIn, hasAuthorization, deleteUser);

router.route("/api/user/remove/follow").put(requireSignIn, removeFöllowing, removeFöllower);
router.route("/api/user/add/follow").put(requireSignIn, addFollowing, addFöllower);

//router.put("/api/user/add/follow",requireSignIn, addFöllower,addFollowing);

router.param("userId", getUserById);

module.exports = router;
