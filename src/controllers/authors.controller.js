const authorsService = require("../services/authors.service");

const getAllAuthors = async (req, res) => {
  try {
    const authors = await authorsService.getAllAuthors();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener autores" });
  }
};

const getAuthorById = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await authorsService.getAuthorById(id);
    if (!author) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el autor" });
  }
};

const createAuthor = async (req, res) => {
  const { name, email, bio } = req.body;
  try {
    const newAuthor = await authorsService.createAuthor(name, email, bio);
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el autor" });
  }
};

const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name, email, bio } = req.body;
  try {
    const updatedAuthor = await authorsService.updateAuthor(
      id,
      name,
      email,
      bio,
    );
    if (!updatedAuthor) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }
    res.json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el autor" });
  }
};

const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAuthor = await authorsService.deleteAuthor(id);
    if (!deletedAuthor) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }
    res.json({ message: "Autor eliminado", autor: deletedAuthor });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el autor" });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
