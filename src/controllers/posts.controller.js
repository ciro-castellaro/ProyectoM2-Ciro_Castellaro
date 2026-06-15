const postsService = require("../services/posts.service");

const getAllPosts = async (req, res) => {
  try {
    const posts = await postsService.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener posts" });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postsService.getPostById(id);

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el post" });
  }
};

const getPostsByAuthorId = async (req, res) => {
  const { authorId } = req.params;
  try {
    const posts = await postsService.getPostsByAuthorId(authorId);
    if (posts.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron posts para este autor" });
    }
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los posts del autor" });
  }
};

const createPost = async (req, res) => {
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
    res.status(500).json({ error: "Error al crear el post" });
  }
};

const updatePost = async (req, res) => {
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
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el post" });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await postsService.deletePost(id);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el post" });
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
