const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sql, config } = require("../models/Entrenamiento");

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Buscar usuario en la base de datos por Nombre
  try {
    await sql.connect(config);
    const result =
      await sql.query`SELECT * FROM Usuarios WHERE Nombre = ${username}`;
    if (result.recordset.length === 0)
      return res.status(401).json({ error: "Credenciales inválidas" });
    const user = result.recordset[0];
    // Comparar contraseña en texto plano
    if (password !== user.PasswordHash)
      return res.status(401).json({ error: "Credenciales inválidas" });
    const token = jwt.sign(
      { username: user.Nombre, role: user.Rol },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );
    res.json({ token, role: user.Rol });
  } catch (err) {
    return res.status(503).json({
      error: "Base de datos no disponible.",
    });
  }
};
