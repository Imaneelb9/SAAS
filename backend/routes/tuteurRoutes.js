const express = require('express');
const router = express.Router();
const { Etudiant, User } = require('../models');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/etudiants', verifyToken, async (req, res) => {
  // À adapter pour ne retourner que les étudiants du tuteur connecté
  const etudiants = await Etudiant.findAll({ include: [{ model: User }] });
  res.json(etudiants.map(e => ({
    id: e.id,
    nom: e.User?.nom,
    prenom: e.User?.prenom,
    email: e.User?.email
  })));
});

module.exports = router;
