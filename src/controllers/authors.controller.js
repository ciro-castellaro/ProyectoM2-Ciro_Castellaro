const authorsService = require("../services/authors.service");
const AppError = require("../utils/AppError");

const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await authorsService.getAllAuthors();
    res.json(authors);
  } catch (error) {
    next(error);
  }
};

const getAuthorById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const author = await authorsService.getAuthorById(id);
    if (!author) {
      throw new AppError("Autor no encontrado", 404);
    }
    res.json(author);
  } catch (error) {
    next(error);
  }
};

const createAuthor = async (req, res, next) => {
  const { name, email, bio } = req.body;
  try {
    const newAuthor = await authorsService.createAuthor(name, email, bio);
    res.status(201).json(newAuthor);
  } catch (error) {
    if (error.code === "23505") {
      return next(new AppError("Ya existe un autor con ese email", 400));
    }
    next(error);
  }
};

const updateAuthor = async (req, res, next) => {
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
      throw new AppError("Autor no encontrado", 404);
    }
    res.json(updatedAuthor);
  } catch (error) {
    next(error);
  }
};

const deleteAuthor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedAuthor = await authorsService.deleteAuthor(id);
    if (!deletedAuthor) {
      throw new AppError("Autor no encontrado", 404);
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
