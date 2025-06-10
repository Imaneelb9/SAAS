// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token manquant" });

  // Accepte "Bearer <token>" ou juste "<token>"
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(' ')[1] : authHeader;
  if (!token) return res.status(401).json({ error: "Token invalide" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contient id, email, role...
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token invalide ou expiré" });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: "Accès interdit : Admin uniquement" });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };
