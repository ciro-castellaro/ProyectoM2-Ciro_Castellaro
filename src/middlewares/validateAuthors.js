const pool = require("../config/db");

async function validateAuthor(req, res, next) {
  const { name, email } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ error: 'El campo "name" es obligatorio' });
  }

  if (!email || email.trim() === "") {
    return res.status(400).json({ error: 'El campo "email" es obligatorio' });
  }

  try {
    const result = await pool.query("SELECT id FROM authors WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Ya existe una cuenta con ese email" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error al validar el email" });
  }

  next();
}

module.exports = validateAuthor;
