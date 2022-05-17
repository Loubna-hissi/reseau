 const mongoose = require("mongoose")
const { objectId } = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true, //delete spaces at the begin and end
        required: true
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    comments: [{
        text: String,
        createdAt: { type: Date, default: Date.now },
        postedBy: {
            type: mongoose.Schema.ObjectId,
            trim: "User"
        }
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model("Post", PostSchema);