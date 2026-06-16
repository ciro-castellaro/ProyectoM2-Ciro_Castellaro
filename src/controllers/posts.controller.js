const postsService = require("../services/posts.service");
const AppError = require("../utils/AppError");

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await postsService.getAllPosts();
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await postsService.getPostById(id);

    if (!post) {
      throw new AppError("Post no encontrado", 404);
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
};

const getPostsByAuthorId = async (req, res, next) => {
  const { authorId } = req.params;
  try {
    const posts = await postsService.getPostsByAuthorId(authorId);
    if (posts.length === 0) {
      throw new AppError("No se encontraron posts para este autor", 404);
    }
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  const { author_id, title, content, published } = req.body;

  try {
    const newPost = await postsService.createPost(
      author_id,
      title,
      content,
      published,
    );

    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, published } = req.body;

  try {
    const updatedPost = await postsService.updatePost(
      id,
      title,
      content,
      published,
    );

    if (!updatedPost) {
      throw new AppError("Post no encontrado", 404);
    }

    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedPost = await postsService.deletePost(id);

    if (!deletedPost) {
      throw new AppError("Post no encontrado", 404);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByAuthorId,
  createPost,
  updatePost,
  deletePost,
};
