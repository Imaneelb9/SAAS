require('dotenv').config(); // Assurez-vous que dotenv est chargé en premier
const app = require('./app');
const sequelize = require('./config/database'); // <-- corrigez ce chemin
require('./models'); // 👈 TRÈS IMPORTANT pour que tous les modèles soient chargés

const PORT = process.env.PORT || 5000;

sequelize.sync({ force: true }).then(() => {
  console.log("✅ Base de données synchronisée.");
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  });
}).catch(err => {
  console.error("❌ Erreur de connexion à la base :", err);
});
