const jwt = require("jsonwebtoken");

function authMiddleware(roles = []) {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("[AUTH] Authorization header:", authHeader);
    if (!authHeader) {
      console.log("[AUTH] No Authorization header");
      return res.status(401).json({ error: "Token requerido" });
    }
    const token = authHeader.split(" ")[1];
    console.log("[AUTH] Token:", token);
    if (!token) {
      console.log("[AUTH] No token after split");
      return res.status(401).json({ error: "Token inválido" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("[AUTH] Decoded token:", decoded);
      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role)) {
        console.log("[AUTH] Role not authorized:", decoded.role);
        return res.status(403).json({ error: "No autorizado" });
      }
      next();
    } catch (err) {
      console.log("[AUTH] JWT verification error:", err.message);
      return res.status(401).json({ error: "Token inválido" });
    }
  };
}

module.exports = authMiddleware;
