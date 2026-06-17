const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.controller");
const {
  validatePost,
  validatePostUpdate,
} = require("../middlewares/validatePosts");

router.get("/", postsController.getAllPosts);
router.get("/author/:authorId", postsController.getPostsByAuthorId);
router.get("/:id", postsController.getPostById);
router.post("/", validatePost, postsController.createPost);
router.put("/:id", validatePostUpdate, postsController.updatePost);
router.delete("/:id", postsController.deletePost);

module.exports = router;
