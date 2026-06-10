const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

// ? Datos en memoria (TESTING, LUEGO APLICAMOS BASE DE DATOS)

let posts = [
  {
    id: 1,
    author_id: 101,
    title: "Primeros pasos en JavaScript",
    content:
      "En este post te cuento cómo empecé a programar con JS y qué conceptos básicos me ayudaron a avanzar.",
    published: true,
    created_at: "2024-03-15T10:30:00Z",
  },
  {
    id: 2,
    author_id: 102,
    title: "Diseño accesible en la web",
    content:
      "La accesibilidad no es opcional. Aquí comparto buenas prácticas para que tus sitios sean inclusivos.",
    published: true,
    created_at: "2024-04-02T14:45:00Z",
  },
  {
    id: 3,
    author_id: 101,
    title: "Errores comunes al usar Git",
    content:
      "Desde commits mal nombrados hasta merges complicados, estos son los errores más frecuentes y cómo evitarlos.",
    published: false,
    created_at: "2024-05-10T09:00:00Z",
  },
];

let nextId = 4;

app.get("/posts", (req, res) => {
  res.json(posts);
});

// RUTAS
module.exports = app;
