const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ error: 'Token manquant' });
  if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ error: 'Format de token invalide' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token invalide ou expiré' });
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
