function checkRole(role) {
  return (req, res, next) => {
    // Pour debug, affichez le rôle du token
    // console.log("Rôle du token :", req.user && req.user.role, "| Rôle requis :", role);
    if (!req.user) {
      return res.status(401).json({ error: "Token manquant ou invalide" });
    }
    // Autoriser si le rôle du token correspond OU si c'est un admin
    if (req.user.role === role || req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ error: "Accès refusé : rôle insuffisant" });
    }
  };
}

module.exports = checkRole;
