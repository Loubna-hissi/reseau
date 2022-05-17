const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const { isMap } = require("lodash");
//const { objectId } = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, //delete spaces at the begin and end
        required: true
    },
    about: {
        type: String,
        trim: true
    },

    image: {
        data: Buffer,
        contentType: String
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    salt: String, //cryptage of mdp
    hashed_passsword: {
        type: String,
        required: true
    },
    city:{
        type:String,
    },
    birthday:{
        type:Date,
        required:true
    },
    relationship:{
        type:String,
    },
    gender:{
        type:String,
        required:true
    },
    following: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    verified: {
        type:Boolean,
        default:false
    }
}, {
    timestamps: true,
});

UserSchema.virtual("password")
    .get(function() {
        return this._password;
    }).set(function(password) {
        this._password = password;
        let salt = (this.salt = bcrypt.genSaltSync(10));
        this.hashed_passsword = bcrypt.hashSync(password, salt)

    })

UserSchema.methods.comparePassword = function(passwordToCheck, cb) {
    bcrypt.compare(passwordToCheck, this.hashed_passsword, function(err, isMatch) {
        if (err) cb(err);
        cb(null, isMatch);
    })
}
module.exports = mongoose.model("User", UserSchema);