const express = require('express');
const router = express.Router();
const { User, Stage } = require('../models');

// Vérification de la route
router.get('/', (req, res) => {
  res.json({ message: "Admin routes OK" });
});

// Liste de tous les utilisateurs
router.get('/utilisateurs', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
});

// Activation/désactivation d'un utilisateur
router.put('/utilisateurs/:id/activation', async (req, res) => {
  try {
    const { id } = req.params;
    const { actif } = req.body;
    await User.update({ actif }, { where: { id } });
    res.json({ message: "Statut mis à jour" });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la mise à jour" });
  }
});

// Statistiques des stages
router.get('/statistiques', async (req, res) => {
  try {
    const attente = await Stage.count({ where: { status: 'en attente' } });
    const valide = await Stage.count({ where: { status: 'valide' } });
    const refuse = await Stage.count({ where: { status: 'refuse' } });
    res.json({ attente, valide, refuse });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des statistiques" });
  }
});

module.exports = router;
