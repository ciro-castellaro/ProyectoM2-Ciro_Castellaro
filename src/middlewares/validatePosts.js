const AppError = require("../utils/AppError");

function validatePost(req, res, next) {
  const { title, content, author_id } = req.body;

  if (!title || title.trim() === "") {
    return next(new AppError('El campo "title" es obligatorio', 400));
  }
  if (!content || content.trim() === "") {
    return next(new AppError('El campo "content" es obligatorio', 400));
  }
  if (author_id === undefined || author_id === null || author_id === "") {
    return next(new AppError('El campo "author_id" es obligatorio', 400));
  }
  next();
}

function validatePostUpdate(req, res, next) {
  const { title, content } = req.body;

  if (!title || title.trim() === "") {
    return next(new AppError('El campo "title" es obligatorio', 400));
  }
  if (!content || content.trim() === "") {
    return next(new AppError('El campo "content" es obligatorio', 400));
  }
  next();
}

module.exports = { validatePost, validatePostUpdate };
