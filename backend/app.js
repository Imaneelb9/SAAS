const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Ajoutez ceci pour gérer les formulaires multipart

// ROUTES
app.use('/api/stages', require('./routes/stageRoutes'));
app.use('/api/entreprises', require('./routes/entrepriseRoutes'));
app.use('/api/etudiants', require('./routes/etudiantRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tuteur', require('./routes/tuteurRoutes'));
app.use('/api/admin', require('./routes/adminRoutes')); // déplacez cette ligne ici, pas besoin de const

app.get('/', (req, res) => {
  res.send('🚀 API de gestion des stages opérationnelle');
});

// Pour corriger un crash backend :
// 1. Ouvrez la console où tourne nodemon et lisez le message d’erreur affiché.
// 2. Corrigez le fichier concerné (souvent une erreur de syntaxe, un module manquant, ou un problème de connexion à la base).
// 3. Redémarrez nodemon après correction.
// Ce fichier (app.js) ne provoque pas le crash du backend, vérifiez les autres fichiers listés dans l’erreur.

module.exports = app;
