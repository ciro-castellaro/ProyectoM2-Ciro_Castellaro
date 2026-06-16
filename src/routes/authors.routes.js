const express = require("express");
const router = express.Router();
const validateAuthor = require("../middlewares/validateAuthors");
const authorsController = require("../controllers/authors.controller");

router.get("/", authorsController.getAllAuthors);
router.get("/:id", authorsController.getAuthorById);
router.post("/", validateAuthor, authorsController.createAuthor);
router.put("/:id", validateAuthor, authorsController.updateAuthor);
router.delete("/:id", authorsController.deleteAuthor);

module.exports = router;
