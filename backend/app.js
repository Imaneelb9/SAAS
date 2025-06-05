const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // autorise le frontend React (port 3000)
  credentials: true
}));
app.use(express.json());

// ROUTES
app.use('/api/stages', require('./routes/stageRoutes'));
app.use('/api/entreprises', require('./routes/entrepriseRoutes'));
// app.use('/api/etudiants', require('./routes/etudiantRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/tuteur', require('./routes/tuteurRoutes'));

app.get('/', (req, res) => {
  res.send('🚀 API de gestion des stages opérationnelle');
});

module.exports = app;
