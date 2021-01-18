const express = require("express");

const PostCtrl = require("../controllers/post-controllers");
const UserCtrl = require("../controllers/user-controllers");
const router = express.Router();

router.post("/post", PostCtrl.createPost);
router.put("/post/:id", PostCtrl.updatePost);
router.delete("/post/:id", PostCtrl.deletePost);
router.get("/post/:id", PostCtrl.getPostById);
router.get("/posts", PostCtrl.getPosts);
router.post("/auth/signup", UserCtrl.createUser);
router.post("/auth/login", UserCtrl.getUser);
router.get("/posts/:name", PostCtrl.getPostsByName);
module.exports = router;
