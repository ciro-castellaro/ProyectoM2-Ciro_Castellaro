INSERT INTO authors (name, email, bio) VALUES 
    ('Lucas Martinez', 'lucas.martinez@mail.com', 'Desarrollador backend apasionado por PostgreSQL y APIs REST.'), 
    ('Sofia Gonzalez', 'sofia.gonzalez@mail.com', 'Ingeniera de software interesada en arquitectura de sistemas.'), 
    ('Mateo Fernandez', 'mateo.fernandez@mail.com', 'Programador full stack y entusiasta del código limpio.')

INSERT INTO posts (author_id, title, content, published) VALUES 
(1, 'Introducción a PostgreSQL', 'Post introductorio sobre PostgreSQL y sus ventajas.', TRUE), 
(2, '¿Qué es una API REST?', 'Explicación básica de los principios REST.', TRUE), 
(3, 'Primeros pasos con Node.js', 'Guía para comenzar a desarrollar con Node.js.', TRUE), 
(1, 'Buenas prácticas en JavaScript', 'Consejos para escribir código más limpio.', FALSE), 
(2, 'Relaciones en bases de datos', 'Cómo modelar relaciones uno a muchos.', TRUE)