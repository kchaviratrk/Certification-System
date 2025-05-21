-- Esquema inicial para la base de datos del sistema de certificación
-- Tabla de Usuarios
CREATE TABLE Usuarios (
    UsuarioID INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    Rol NVARCHAR(50) NOT NULL,
    FechaRegistro DATETIME DEFAULT GETDATE()
);

-- Tabla de Entrenamientos
DROP TABLE IF EXISTS Entrenamientos;

CREATE TABLE Entrenamientos (
    id INT PRIMARY KEY IDENTITY(1,1),
    motivo NVARCHAR(200) NOT NULL,
    fecha DATE NOT NULL,
    tipoCurso NVARCHAR(100) NOT NULL,
    duracion NVARCHAR(50) NOT NULL,
    nombreCurso NVARCHAR(200) NOT NULL,
    nombreInstructor NVARCHAR(200) NOT NULL,
    objetivos NVARCHAR(MAX),
    evaluaciones NVARCHAR(MAX),
    asistentes NVARCHAR(MAX)
);

-- Tabla de Checklists
CREATE TABLE Checklists (
    ChecklistID INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(200) NOT NULL,
    Descripcion NVARCHAR(500),
    FechaCreacion DATETIME DEFAULT GETDATE(),
    UsuarioID INT FOREIGN KEY REFERENCES Usuarios(UsuarioID)
);

-- Tabla de Matriz de Habilidades
CREATE TABLE MatrizHabilidades (
    MatrizID INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(200) NOT NULL,
    Descripcion NVARCHAR(500),
    FechaCreacion DATETIME DEFAULT GETDATE(),
    UsuarioID INT FOREIGN KEY REFERENCES Usuarios(UsuarioID)
);
