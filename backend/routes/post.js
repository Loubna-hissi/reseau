const express = require("express");
const {
    requireSignIn
} = require("../controllers/auth");
const {
    getAllPosts, addPost, userPosts, getPostById, isOwner, likePost, deletePost, unlikePost, addComment, deleteComment 
} = require("../controllers/post");
const { getUserById } = require('../controllers/user');

const router = express.Router();

router.get("/api/posts/:userId", requireSignIn, getAllPosts);
router.get("/api/posts/by/:userId", requireSignIn, userPosts);
router.delete("/api/post/:postId", requireSignIn,isOwner, deletePost);
router.post("/api/post/create/:userId", requireSignIn, addPost);
router.put("/api/post/like", requireSignIn, likePost);
router.put("/api/post/unlike", requireSignIn, unlikePost);
router.put("/api/post/comment", requireSignIn, addComment);
router.put("/api/post/uncomment", requireSignIn, deleteComment);

router.param("userId", getUserById);
router.param("postId", getPostById);

module.exports = router;