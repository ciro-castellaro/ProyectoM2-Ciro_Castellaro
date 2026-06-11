const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

// RUTAS (acá van a ir los routers después)

module.exports = app;
