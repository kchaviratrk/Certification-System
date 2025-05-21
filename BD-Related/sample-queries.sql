-- Consultas de ejemplo para la base de datos del sistema de certificación

-- Insertar un usuario
INSERT INTO Usuarios (Nombre, Email, PasswordHash, Rol)
VALUES ('Juan Pérez', 'juan@example.com', 'hash123', 'admin');

-- Consultar todos los entrenamientos
SELECT * FROM Entrenamientos;

-- Insertar un entrenamiento
INSERT INTO Entrenamientos (Titulo, Descripcion, Fecha, UsuarioID)
VALUES ('Entrenamiento Seguridad', 'Capacitación en seguridad', '2025-05-20', 1);

-- Consultar checklists de un usuario
SELECT * FROM Checklists WHERE UsuarioID = 1;

-- Insertar en matriz de habilidades
INSERT INTO MatrizHabilidades (Nombre, Descripcion, UsuarioID)
VALUES ('Operador Básico', 'Matriz para operadores', 1);
