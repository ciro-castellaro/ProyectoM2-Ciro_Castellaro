function validatePost(req, res, next) {
  const { title, content, author_id } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: 'El campo "title" es obligatorio' });
  }

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: 'El campo "content" es obligatorio' });
  }

  if (author_id === undefined || author_id === null || author_id === "") {
    return res
      .status(400)
      .json({ error: 'El campo "author_id" es obligatorio' });
  }

  next();
}

module.exports = validatePost;
