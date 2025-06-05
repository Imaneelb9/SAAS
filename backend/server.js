require('dotenv').config(); // Assurez-vous que dotenv est chargé en premier
const app = require('./app');
const sequelize = require('./config/database'); // chemin corrigé
require('./models'); // 👈 TRÈS IMPORTANT pour que tous les modèles soient chargés

const PORT = process.env.PORT || 5000;

// ATTENTION : n'utilisez PAS { force: true } dans sync() sauf pour reset la base !
// Utilisez { alter: true } pour mettre à jour sans tout supprimer.
sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Base de données synchronisée.");
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  });
}).catch(err => {
  console.error("❌ Erreur de connexion à la base :", err);
});
