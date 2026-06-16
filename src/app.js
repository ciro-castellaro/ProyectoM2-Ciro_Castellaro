const express = require("express");
const authorsRouter = require("./routes/authors.routes");
const postsRouter = require("./routes/posts.routes");
require("dotenv").config();

const app = express();

app.use(express.json());

// RUTAS (ROUTERS)
app.use("/authors", authorsRouter);
app.use("/posts", postsRouter);

app.use(errorHandler);
module.exports = app;
