const User = require("../models/user");
const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");
const Token = require("../models/token");
require('dotenv').config();
const crypto = require("crypto");

const createUser = async (req, res) => {
    const { name, email, password, city, relationship, gender, birthday } = req.body;
    try {
        let user = await User.findOne({ email });
        // console.log(user)
        if (user) return res.json({ error: "Register operation is failed, Try another email to sign up!" });

        user = await new User({ name, email, password, city, relationship, gender, birthday }).save();
        res.json(user);
        // console.log(user)

        // const token = await new Token({
        //     userId: user._id,
        //     token: crypto.randomBytes(32).toString("hex"),
        // }).save();

        // const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;
        // await sendEmail(user.email, "Verify Email", url);

        // return res.json({ error: "verify ur mail!" });

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

// const verifyAccount = async (req, res) => {
//     const id = req.params.id;
//     const token = req.params.token;
//     console.log(id, token)
//     console.log("in fnct")
//     try {
//         console.log("in try")
//         const user = await User.findOne({ _id: req.params.id });
//         if (!user) return res.json({ error: "invalid linl 1!" });
//         console.log(user)
//         const token = await Token.findOne({
//             userId: req.params.id,
//             token: req.params.token,
//         });
//         if (!token) { return res.json({ error: "invalid linl 2!" }); }

//         await User.updateOne({ _id: user._id, verified: true });

//         token.remove((err, tokenDeleted) => {
//             if (err) return res.json({ error: "connot remove token" });
//         }); console.log(token);

//         return res.json({ error: "email verified!" });

//     } catch (error) {
//         return res.json({ error });

//     }
// }

const getAllUsers = (req, res) => {
    User.find((err, users) => {
        if (err || !users) return res.json({ error: err });
        return res.json(users);
    }).select("name email about image createdAt");
}

const updateUser = (req, res) => {
    //console.log(req.body);
    console.log('with _')
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) { return res.json({ error: "Impossible d'ajouter le fichier séléctionné" }); }
        let user = req.profile;
        user = _.extend(user, fields);
        console.log(user)
        if (files.image) {
            user.image.data = fs.readFileSync(files.image.filepath);
            user.image.contentType = files.image.mimetype;
        }
        user.save((err, result) => {
            if (err) return res.json({ error: "this is wrong" });
            result.hashed_password = undefined;
            result.salt = undefined;
            result.image = undefined;
            res.json(result);
        });
    });
};
const getUserById = (req, res, next, id) => {
    User.findById(id)
        .populate("following", "_id name")
        .populate("followers", "_id name ")
        .exec((err, user) => {
            if (err || !user) return res.json({ error: "profil not found" });
            req.profile = user;
            next();
        })
};

const deleteUser = (req, res) => {
    let user = req.profile;
    user.remove((err, deletedUser) => {
        if (err) return res.json({ error: err });
        res.json({ message: "Compte supprimé" });
    });
};

const getUser = (req, res) => {
    req.profile.hashed_passsword = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

const addFollowing = (req, res, next) => {
    User.findByIdAndUpdate(
        req.body.userId,
        { $push: { following: req.body.followId } }, { new: true },
        (err, result) => {
            if (err) return res.json({ error: err });
            next();
        }
    )
}

const addFöllower = (req, res, next) => {
    User.findByIdAndUpdate(
        req.body.followId,
        { $push: { followers: req.body.userId } }, { new: true },
    )
        .populate("following", "_id name")
        .populate("followers", "_id name")
        .exec((err, result) => {
            if (err) return res.json({ error: err });
            result.hashed_passsword = undefined;
            result.salt = undefined;
            // result.image = undefined;
            res.json(result);
        }
        );
};

const removeFöllowing = (req, res, next) => {
    User.findByIdAndUpdate(
        req.body.userId,
        { $pull: { following: req.body.followId } }, { new: true },

        (err, result) => {
            if (err) return res.json({ error: err });
            next();
        }
    );
};

const removeFöllower = (req, res, next) => {
    User.findByIdAndUpdate(
        req.body.followId,
        { $pull: { followers: req.body.userId } }, { new: true })
        .populate("following", "_id name")
        .populate("followers", "_id name")
        .exec((err, result) => {
            if (err) return res.json({ error: err });
            result.hashed_passsword = undefined;
            result.salt = undefined;
            // result.image = undefined;
            res.json(result);
        }
        );
};


const getUserPhoto = (req, res) => {
    if (req.profile.image.data) {
        res.set("Content-Type", req.profile.image.contentType);
        return res.send(req.profile.image.data);
    } else
        return res.sendFile("C:/Users/USER/Desktop/crud nodeJs/test_net_projet/images/user.png");
};



module.exports = {
    createUser,
    getUserById,
    getUser,
    deleteUser,
    getAllUsers,
    updateUser,
    getUserPhoto,
    addFollowing,
    addFöllower,
    removeFöllower,
    removeFöllowing,
    
}

