require('dotenv').config(); // Assurez-vous que dotenv est chargé en premier
const app = require('./app');
const sequelize = require('./config/database'); // chemin corrigé
require('./models'); // 👈 TRÈS IMPORTANT pour que tous les modèles soient chargés

const PORT = process.env.PORT || 5000;

// ATTENTION : n'utilisez PAS { force: true } dans sync() sauf pour reset la base !
// Utilisez { alter: true } pour mettre à jour sans tout supprimer.
// Si vous avez l'erreur "Too many keys specified; max 64 keys allowed"
// Il faut supprimer les index/uniques en trop sur la table Users dans votre base MySQL.
// Faites ceci dans phpMyAdmin ou avec ce SQL :
  // ALTER TABLE Users DROP INDEX email;
  // (Répétez si plusieurs index dupliqués existent sur email)
// Puis relancez le backend.

sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Base de données synchronisée.");
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  });
}).catch(err => {
  console.error("❌ Erreur de connexion à la base :", err);
});
