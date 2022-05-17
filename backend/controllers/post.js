const Post = require("../models/post");

const getAllPosts = (req, res) => {

    Post.find()
        .populate("comments.postedBy", "text created")
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .sort("-createdAt")
        .exec((err, posts) => {
            if (err) res.json({ error: err });
            res.json(posts);
        })
}

const addPost = (req, res) => {
    const { text } = req.body;
    console.log(req.auth._id)
    let post = new Post({ text, postedBy: req.profile._id })
    post.save((err, data) => {
        if (err) res.json({ error: err });
        res.json(data);
    })
}

const userPosts = (req, res) => {

    Post.find({ postedBy: req.profile._id })
        .populate("comments.postedBy", "text created")
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .sort("-createdAt")
        .exec((err, posts) => {
            if (err) res.json({ error: err });
            res.json(posts);
        })
}

const getPostById = (req, res, next, id) => {
    Post.findById(id)
        .populate("comments.postedBy", "text created")
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .exec((err, post) => {
            if (err) res.json({ error: err });
            req.post = post;

            next();
        })
}

const deletePost = (req, res) => {
    let postToDelete = req.post;
    postToDelete.remove((err, deletedPost) => {
        if (err) res.json({ error: err });
        res.json({ message: "Post Deleted!" })

    });
}

const likePost = (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, { $push: { likes: req.body.userId } }, { new: true })
        .exec((err, result) => {
            if (err) res.json({ error: err });
            res.json(result);
        })
}

const unlikePost = (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, { $pull: { likes: req.body.userId } }, { new: true })
        .exec((err, result) => {
            if (err) res.json({ error: err });
            res.json(result);
        })
}

const addComment = (req, res) => {
    let comment = { text: req.body.text };
    comment.postedBy = req.body.userId;
    Post.findByIdAndUpdate(req.body.postId, { $push: { comments: comment } }, { new: true })
        .exec((err, result) => {
            if (err) res.json({ error: err });
            res.json(result);
        })
};



const deleteComment = (req, res) => {
    let commentId = req.body.commentId;
    Post.findByIdAndUpdate(req.body.postId, { $pull: { comments: { _id: commentId } } }, { new: true })
        .exec((err, result) => {
            if (err) res.json({ error: err });
            res.json(result);
        })
};


const isOwner = (req, res, next) => {

    let isMine = req.post && req.auth && req.post.postedBy._id == req.auth._id;
    if (!isMine) {
        return res.json({ error: "Not allowed!" });
    }
    next();
}

module.exports = { getAllPosts, addPost, userPosts, getPostById, isOwner, likePost, deletePost, unlikePost, addComment, deleteComment }