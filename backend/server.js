require('dotenv').config(); // Assurez-vous que dotenv est chargé en premier
const app = require('./app');
const db = require('./models'); // Importez tout le dossier models
app.use('/api', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes')); // <-- Ajouté

const PORT = process.env.PORT || 5000;

// Utilisez db.sequelize.authenticate()
db.sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie');
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion à la base :', err);
    process.exit(1);
  });
