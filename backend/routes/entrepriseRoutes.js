const express = require('express');
const router = express.Router();
// Ajoutez ici vos middlewares si besoin (auth, etc.)
const { Entreprise } = require('../models');

// Exemple : obtenir la liste des entreprises
router.get('/', async (req, res) => {
  try {
    const entreprises = await Entreprise.findAll();
    res.json(entreprises);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des entreprises" });
  }
});

// Exemple : créer une entreprise (à adapter selon votre logique)
router.post('/', async (req, res) => {
  try {
    const entreprise = await Entreprise.create(req.body);
    res.status(201).json(entreprise);
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de la création de l'entreprise" });
  }
});

// Ajoutez ici d'autres routes spécifiques à l'entreprise si besoin

module.exports = router;
