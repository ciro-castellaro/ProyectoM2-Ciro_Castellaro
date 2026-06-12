const express = require("express");
const authorsRouter = require("./routes/authors.routes");
require("dotenv").config();

const app = express();

app.use(express.json());

// RUTAS (ROUTERS)
app.use("/authors", authorsRouter);

module.exports = app;
