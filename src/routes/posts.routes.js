const express = require("express");
const router = express.Router();
const validatePost = require("../middlewares/validatePosts");
const postsController = require("../controllers/posts.controller");

router.get("/", postsController.getAllPosts);
router.get("/author/:authorId", postsController.getPostsByAuthorId);
router.get("/:id", postsController.getPostById);
router.post("/", validatePost, postsController.createPost);
router.put("/:id", validatePost, postsController.updatePost);
router.delete("/:id", postsController.deletePost);

module.exports = router;
